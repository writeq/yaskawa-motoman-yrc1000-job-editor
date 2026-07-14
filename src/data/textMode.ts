import type { Job, JobLine } from '../types/jbi';
import type { ParsedInstHeader } from './jbiFormat';
import { INSTRUCTIONS_BY_CATEGORY } from './instructions';

const KNOWN_INSTRUCTIONS = new Set<string>(['NOP', 'END', ...Object.values(INSTRUCTIONS_BY_CATEGORY).flat()]);

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
