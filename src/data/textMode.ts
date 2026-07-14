import type { Job, JobLine } from '../types/jbi';
import type { ParsedInstHeader } from './jbiFormat';
import { INSTRUCTIONS_BY_CATEGORY } from './instructions';

const KNOWN_INSTRUCTIONS = new Set<string>(['NOP', 'END', ...Object.values(INSTRUCTIONS_BY_CATEGORY).flat()]);

/** Sorted, de-duplicated instruction names for autocomplete. */
export const KNOWN_INSTRUCTION_NAMES: string[] = Array.from(KNOWN_INSTRUCTIONS).sort();

export interface LogEntry {
  lineNo: number | null;
  text: string;
}

/** Renders the job's instruction lines as plain editable text, one
 * instruction per line, using the same `//` comment convention shown in
 * Standard Mode. */
export function linesToTextModeContent(lines: JobLine[]): string {
  return lines.map((l) => (l.isCommentMarked ? `//${l.text}` : l.text)).join('\n');
}

/** Read-only header preview lines shown above the editable body when "Job
 * all display" is on. This is not parsed back — only the instruction body
 * is editable in Text Mode. */
export function buildHeaderPreviewLines(job: Job, instHeader: ParsedInstHeader | undefined): string[] {
  const out: string[] = ['/JOB', `//NAME ${job.header.name}`];
  if (job.rawPositionSection.length > 0) out.push(...job.rawPositionSection);
  out.push('//INST');
  if (instHeader) {
    for (const entry of instHeader.order) {
      if (entry.key === 'DATE') out.push(`///DATE ${job.header.dateTime}`);
      else if (entry.key === 'COMM') out.push(`///COMM ${job.header.comment}`);
      else if (entry.key === 'GROUP1') out.push(`///GROUP1 ${job.header.controlGroup}`);
      else out.push(entry.raw);
    }
  } else {
    out.push(`///DATE ${job.header.dateTime}`);
    out.push(`///GROUP1 ${job.header.controlGroup}`);
  }
  return out;
}

export interface TokenAtCursor {
  /** The partial instruction name typed so far (leading token of its line). */
  token: string;
  start: number;
  end: number;
  line: number;
  column: number;
}

/** Finds the leading token of the current line up to the cursor, for
 * instruction-name autocomplete. Returns null when the cursor is inside a
 * comment line or past the line's first token (i.e. typing an argument). */
export function getCurrentToken(content: string, cursorPos: number): TokenAtCursor | null {
  const before = content.slice(0, cursorPos);
  const lineStart = before.lastIndexOf('\n') + 1;
  const line = (before.match(/\n/g) ?? []).length;
  const lineTextBeforeCursor = before.slice(lineStart);
  if (lineTextBeforeCursor.trimStart().startsWith('//')) return null;
  const leadingMatch = /^\s*/.exec(lineTextBeforeCursor);
  const leadingLen = leadingMatch ? leadingMatch[0].length : 0;
  const rest = lineTextBeforeCursor.slice(leadingLen);
  if (/\s/.test(rest)) return null;
  return { token: rest, start: lineStart + leadingLen, end: cursorPos, line, column: cursorPos - lineStart };
}

export function parseTextModeContent(content: string): JobLine[] {
  return content
    .split('\n')
    .map((raw) => raw.trim())
    .filter((line) => line !== '')
    .map((line, idx) => {
      const isCommentMarked = line.startsWith('//');
      const text = isCommentMarked ? line.slice(2).trim() : line;
      return { lineNo: idx, text, isEditLocked: false, isCommentMarked };
    });
}

/** Best-effort syntax check: flags any non-comment line whose first token
 * isn't a recognized instruction name. */
export function validateInstructionText(content: string): LogEntry[] {
  const errors: LogEntry[] = [];
  const rawLines = content.split('\n');
  rawLines.forEach((raw, idx) => {
    const line = raw.trim();
    if (line === '' || line.startsWith('//')) return;
    const token = line.split(/\s+/)[0].toUpperCase();
    if (!KNOWN_INSTRUCTIONS.has(token)) {
      errors.push({ lineNo: idx, text: `L:${idx} Unknown instruction "${token}"` });
    }
  });
  return errors;
}
