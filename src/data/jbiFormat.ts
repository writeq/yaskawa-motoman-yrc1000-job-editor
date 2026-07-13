import type { Job, JobHeader, LocaleVariableCounts } from '../types/jbi';

/**
 * Minimal reader/writer for the INFORM III ".JBI" job file text format.
 *
 * We only actively model a subset of the format (name, comment, control
 * group, date, local variable counts, and the flat instruction list).
 * Everything else — most importantly the //POS position-variable block and
 * any `///` header line we don't recognize — is preserved verbatim so
 * opening and re-saving a real job never silently drops data we don't
 * understand. Treat this as best-effort interoperability, not a verified
 * byte-for-byte implementation of the vendor format.
 */

const LOCALE_ORDER: (keyof LocaleVariableCounts)[] = [
  'byte',
  'integer',
  'double',
  'real',
  'string',
  'robotPosition',
  'basePosition',
  'stationPosition',
];

function emptyLocale(): LocaleVariableCounts {
  return {
    byte: 0,
    integer: 0,
    double: 0,
    real: 0,
    string: 0,
    robotPosition: 0,
    basePosition: 0,
    stationPosition: 0,
  };
}

interface KnownHeaderKey {
  key: 'DATE' | 'COMM' | 'GROUP1' | 'LVARS';
  raw: string;
}

export interface ParsedInstHeader {
  order: (KnownHeaderKey | { key: 'RAW'; raw: string })[];
}

export interface ParseResult {
  job: Job;
  instHeader: ParsedInstHeader;
}

export function fileNameFromPath(filePath: string): string {
  const parts = filePath.split(/[\\/]/);
  return parts[parts.length - 1];
}

export function parseJbi(text: string, filePath: string | null): ParseResult {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  let i = 0;

  if (lines[i]?.trim() === '/JOB') i++;

  let name = 'UNTITLED';
  if (lines[i]?.startsWith('//NAME')) {
    name = lines[i].slice('//NAME'.length).trim();
    i++;
  }

  const rawPositionSection: string[] = [];
  if (lines[i]?.trim() === '//POS') {
    while (i < lines.length && lines[i]?.trim() !== '//INST') {
      rawPositionSection.push(lines[i]);
      i++;
    }
  }

  if (lines[i]?.trim() === '//INST') i++;

  const instHeader: ParsedInstHeader = { order: [] };
  let dateTime = '';
  let comment = '';
  let controlGroup = '';
  let locale = emptyLocale();

  while (i < lines.length && lines[i]?.startsWith('///')) {
    const line = lines[i];
    const body = line.slice(3);
    const spaceIdx = body.indexOf(' ');
    const key = spaceIdx === -1 ? body : body.slice(0, spaceIdx);
    const rest = spaceIdx === -1 ? '' : body.slice(spaceIdx + 1).trim();

    if (key === 'DATE') {
      dateTime = rest;
      instHeader.order.push({ key: 'DATE', raw: line });
    } else if (key === 'COMM') {
      comment = rest;
      instHeader.order.push({ key: 'COMM', raw: line });
    } else if (key === 'GROUP1') {
      controlGroup = rest;
      instHeader.order.push({ key: 'GROUP1', raw: line });
    } else if (key === 'LVARS') {
      const nums = rest.split(',').map((n) => Number(n.trim()) || 0);
      LOCALE_ORDER.forEach((field, idx) => {
        locale[field] = nums[idx] ?? 0;
      });
      instHeader.order.push({ key: 'LVARS', raw: line });
    } else {
      instHeader.order.push({ key: 'RAW', raw: line });
    }
    i++;
  }

  const bodyLines: string[] = [];
  while (i < lines.length && lines[i]?.trim() !== 'END') {
    bodyLines.push(lines[i]);
    i++;
  }
  // The END terminator is kept as an ordinary trailing line so it stays
  // visible/selectable in the editor, matching NOP/END in the mock job and
  // freshly created jobs.
  if (lines[i]?.trim() === 'END') bodyLines.push(lines[i]);

  const jobLines = bodyLines
    .filter((l) => l.trim() !== '')
    .map((raw, idx) => {
      const trimmed = raw.trim();
      const isCommentMarked = trimmed.startsWith("'");
      const text = isCommentMarked ? trimmed.slice(1).trim() : trimmed;
      return { lineNo: idx, text, isEditLocked: false, isCommentMarked };
    });

  const header: JobHeader = {
    name,
    comment,
    jobFolder: 'NONE',
    dateTime,
    sizeBytes: 0,
    controlGroup,
    locale,
  };

  const job: Job = {
    fileName: filePath ? fileNameFromPath(filePath) : `${name}.JBI`,
    filePath,
    header,
    lines: jobLines,
    rawPositionSection,
    isDirty: false,
  };

  return { job, instHeader };
}

export function serializeJob(job: Job, instHeader?: ParsedInstHeader): string {
  const out: string[] = [];
  out.push('/JOB');
  out.push(`//NAME ${job.header.name}`);

  if (job.rawPositionSection.length > 0) {
    out.push(...job.rawPositionSection);
  }

  out.push('//INST');

  const hasKey = (key: KnownHeaderKey['key']) =>
    instHeader?.order.some((o) => o.key === key) ?? false;

  const lvarsLine = () =>
    `///LVARS ${LOCALE_ORDER.map((f) => job.header.locale[f] ?? 0).join(',')}`;

  if (instHeader) {
    for (const entry of instHeader.order) {
      if (entry.key === 'DATE') out.push(`///DATE ${job.header.dateTime}`);
      else if (entry.key === 'COMM') out.push(`///COMM ${job.header.comment}`);
      else if (entry.key === 'GROUP1') out.push(`///GROUP1 ${job.header.controlGroup}`);
      else if (entry.key === 'LVARS') out.push(lvarsLine());
      else out.push(entry.raw);
    }
  }
  if (!instHeader || !hasKey('DATE')) out.push(`///DATE ${job.header.dateTime}`);
  if (!instHeader || !hasKey('COMM')) out.push(`///COMM ${job.header.comment}`);
  if (!instHeader || !hasKey('GROUP1')) out.push(`///GROUP1 ${job.header.controlGroup}`);
  if (!instHeader || !hasKey('LVARS')) out.push(lvarsLine());

  for (const line of job.lines) {
    out.push(line.isCommentMarked ? `'${line.text}` : line.text);
  }
  // job.lines normally already ends with an explicit END line (it's kept
  // visible/selectable in the editor); guard against writing a malformed
  // file if it was ever removed.
  const lastLine = job.lines[job.lines.length - 1];
  if (!lastLine || lastLine.text.trim() !== 'END') out.push('END');

  return out.join('\r\n') + '\r\n';
}
