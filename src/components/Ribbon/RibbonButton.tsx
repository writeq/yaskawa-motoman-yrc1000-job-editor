import type { ReactNode } from 'react';

interface RibbonButtonProps {
  icon: ReactNode;
  label: string;
  size?: 'big' | 'small';
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
}

export function RibbonButton({ icon, label, size = 'big', disabled, onClick, title }: RibbonButtonProps) {
  return (
    <button
      className={`ribbon-btn ribbon-btn-${size}`}
      disabled={disabled}
      onClick={onClick}
      title={title ?? label}
    >
      <span className="ribbon-btn-icon">{icon}</span>
      <span className="ribbon-btn-label">{label}</span>
    </button>
  );
}

interface RibbonCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export function RibbonCheckbox({ label, checked, onChange, disabled }: RibbonCheckboxProps) {
  return (
    <label className="ribbon-checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
      <span>{label}</span>
    </label>
  );
}
