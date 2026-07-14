export const INSTRUCTION_CATEGORIES = [
  'IN/OUT',
  'CONTROL',
  'DEVICE',
  'MOTION',
  'ARITH',
  'SHIFT',
  'OTHER',
  'MACRO',
  'SAME',
  'PRIOR',
] as const;

export type InstructionCategory = (typeof INSTRUCTION_CATEGORIES)[number];

export const INSTRUCTIONS_BY_CATEGORY: Record<InstructionCategory, string[]> = {
  'IN/OUT': ['DOUT', 'DIN', 'PULSE', 'AOUT', 'AIN', 'GOUT', 'GIN'],
  CONTROL: [
    'JUMP',
    'CALL',
    'TIMER',
    'LABEL',
    'COMMENT',
    'RET',
    'NOP',
    'PAUSE',
    'ABORT',
    'CWAIT',
    'PRINT',
  ],
  DEVICE: ['ARATION', 'ARATIOF', 'ARCTON', 'ARCTOF', 'ARCMONON', 'ARCMONOF'],
  MOTION: ['MOVJ', 'MOVL', 'MOVC', 'MOVS', 'SPEED', 'SFTON', 'SFTOF'],
  ARITH: ['ADD', 'SUB', 'MUL', 'DIV', 'AND', 'OR', 'NOT', 'SET'],
  SHIFT: ['SFTON', 'SFTOF'],
  OTHER: ['MSG', 'CUBE', 'ELCPY'],
  MACRO: ['MACRO'],
  SAME: [],
  PRIOR: [],
};

export interface InstructionField {
  label: string;
  value: string;
}

export interface InstructionTemplate {
  name: string;
  fields: InstructionField[];
}

export const INSTRUCTION_TEMPLATES: Record<string, InstructionTemplate> = {
  DOUT: {
    name: 'DOUT',
    fields: [
      { label: 'OUTPUT TO', value: 'OT#(1)' },
      { label: 'DATA', value: 'ON' },
    ],
  },
  DIN: {
    name: 'DIN',
    fields: [
      { label: 'INPUT FROM', value: 'IN#(1)' },
      { label: 'DATA', value: 'ON' },
    ],
  },
  PULSE: {
    name: 'PULSE',
    fields: [
      { label: 'OUTPUT TO', value: 'OT#(1)' },
      { label: 'TIME', value: 'T=0.50' },
    ],
  },
  TIMER: {
    name: 'TIMER',
    fields: [{ label: 'TIME', value: 'T=1.00' }],
  },
  NOP: { name: 'NOP', fields: [] },
  RET: { name: 'RET', fields: [] },
  PAUSE: { name: 'PAUSE', fields: [] },
  SET: {
    name: 'SET',
    fields: [
      { label: 'VAR', value: 'B000' },
      { label: 'VALUE', value: '0' },
    ],
  },
  ADD: {
    name: 'ADD',
    fields: [
      { label: 'VAR', value: 'B000' },
      { label: 'VALUE', value: '1' },
    ],
  },
  SUB: {
    name: 'SUB',
    fields: [
      { label: 'VAR', value: 'B000' },
      { label: 'VALUE', value: '1' },
    ],
  },
  MUL: {
    name: 'MUL',
    fields: [
      { label: 'VAR', value: 'B000' },
      { label: 'VALUE', value: '1' },
    ],
  },
  DIV: {
    name: 'DIV',
    fields: [
      { label: 'VAR', value: 'B000' },
      { label: 'VALUE', value: '1' },
    ],
  },
  AND: {
    name: 'AND',
    fields: [
      { label: 'VAR', value: 'B000' },
      { label: 'VALUE', value: '0' },
    ],
  },
  OR: {
    name: 'OR',
    fields: [
      { label: 'VAR', value: 'B000' },
      { label: 'VALUE', value: '0' },
    ],
  },
  NOT: {
    name: 'NOT',
    fields: [{ label: 'VAR', value: 'B000' }],
  },
};

export function buildInstructionText(name: string, fields: InstructionField[]): string {
  if (fields.length === 0) return name;
  return `${name} ${fields.map((f) => f.value).join(' ')}`;
}

export function parseInstructionLine(text: string): { name: string; fields: InstructionField[] } {
  const trimmed = text.trim();
  const [name, ...rest] = trimmed.split(/\s+/);
  const template = INSTRUCTION_TEMPLATES[name];
  if (template && rest.length === template.fields.length) {
    return { name, fields: template.fields.map((f, i) => ({ label: f.label, value: rest[i] })) };
  }
  if (rest.length === 0) return { name, fields: [] };
  return { name, fields: [{ label: 'DATA', value: rest.join(' ') }] };
}
