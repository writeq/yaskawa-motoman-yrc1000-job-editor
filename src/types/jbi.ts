export interface LocaleVariableCounts {
  byte: number;
  integer: number;
  double: number;
  real: number;
  string: number;
  robotPosition: number;
  basePosition: number;
  stationPosition: number;
}

export interface JobHeader {
  name: string;
  comment: string;
  jobFolder: string;
  dateTime: string;
  sizeBytes: number;
  controlGroup: string;
  locale: LocaleVariableCounts;
}

export interface JobLine {
  lineNo: number;
  text: string;
  isEditLocked: boolean;
  isCommentMarked: boolean;
}

export interface Job {
  fileName: string;
  filePath: string | null;
  header: JobHeader;
  lines: JobLine[];
  /** Raw //POS ... block preserved verbatim so we don't corrupt position-variable
   * data we don't fully model yet. Empty when the job has no position variables. */
  rawPositionSection: string[];
  isDirty: boolean;
}

export function jobStepCount(job: Job): number {
  return job.lines.filter((l) => l.text.trim() !== 'NOP' && l.text.trim() !== 'END').length;
}

export function jobSizeBytes(job: Job): number {
  return job.lines.reduce((sum, l) => sum + l.text.length + 2, 0);
}

export interface ControlGroupDef {
  name: string;
  firstControlGroup: string;
  secondControlGroup: string;
  master: string;
}
