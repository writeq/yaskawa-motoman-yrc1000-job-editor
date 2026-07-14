export interface ConditionFileEntry {
  /** The numeric/alphanumeric identifier at the start of the line (e.g. an I/O number or a variable index). */
  index: string;
  name: string;
}

const ENTRY_LINE = /^\s*(\S+)\s+(.*?)\s*$/;

/**
 * Parses IONAME.DAT / VARNAME.DAT style files: one "index name" pair per line.
 * We don't know the vendor's exact column layout or any section-header convention,
 * so this keeps entries as a flat ordered list instead of guessing at grouping by type.
 */
export function parseConditionFile(content: string): ConditionFileEntry[] {
  const entries: ConditionFileEntry[] = [];
  for (const rawLine of content.split(/\r\n|\r|\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const match = ENTRY_LINE.exec(line);
    if (!match) continue;
    entries.push({ index: match[1], name: match[2] });
  }
  return entries;
}

export function serializeConditionFile(entries: ConditionFileEntry[]): string {
  return entries.map((entry) => `${entry.index}  ${entry.name}`).join('\r\n') + '\r\n';
}
