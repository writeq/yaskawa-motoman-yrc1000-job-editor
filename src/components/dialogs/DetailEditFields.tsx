import type { InstructionField } from '../../data/instructions';

interface DetailEditFieldsProps {
  name: string;
  fields: InstructionField[];
  onChange: (index: number, value: string) => void;
}

export function DetailEditFields({ name, fields, onChange }: DetailEditFieldsProps) {
  return (
    <div className="detail-edit-fields">
      <div className="detail-edit-name">{name}</div>
      {fields.map((f, i) => (
        <div className="form-row" key={f.label}>
          <label>{f.label}</label>
          <input type="text" value={f.value} onChange={(e) => onChange(i, e.target.value)} />
        </div>
      ))}
      {fields.length === 0 && <div className="detail-edit-empty">(no parameters)</div>}
    </div>
  );
}
