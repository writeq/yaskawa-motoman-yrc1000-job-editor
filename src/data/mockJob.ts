import type { Job } from '../types/jbi';

export function createMockJob(): Job {
  return {
    fileName: 'SDF.JBI',
    header: {
      name: 'SDF',
      comment: '',
      jobFolder: 'NONE',
      dateTime: '2026/7/13  16:37:06',
      sizeBytes: 30,
      controlGroup: 'R1',
      locale: {
        byte: 0,
        integer: 0,
        double: 0,
        real: 0,
        string: 0,
        robotPosition: 0,
        basePosition: 0,
        stationPosition: 0,
      },
    },
    lines: [
      { lineNo: 0, text: 'NOP', isEditLocked: false, isCommentMarked: false },
      { lineNo: 1, text: 'DOUT OT#(1) ON', isEditLocked: false, isCommentMarked: false },
      { lineNo: 2, text: 'END', isEditLocked: false, isCommentMarked: false },
    ],
  };
}

export const RECENT_FILES = ['C:\\Users\\...\\OTPRAVKA\\SDF.JBI'];

export const JOB_FOLDERS = [
  'NONE',
  ...Array.from({ length: 29 }, (_, i) => `FOLDER${String(i + 1).padStart(3, '0')}`),
];

export const CONTROL_GROUPS = ['R1', 'NON GROUP'];
