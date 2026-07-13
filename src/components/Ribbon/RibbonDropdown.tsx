import { useState, useRef, useEffect, type ReactNode } from 'react';

interface RibbonDropdownProps {
  icon: ReactNode;
  label: string;
  options: { key: string; label: string; icon: ReactNode }[];
  onSelect: (key: string) => void;
}

export function RibbonDropdown({ icon, label, options, onSelect }: RibbonDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div className="ribbon-dropdown" ref={ref}>
      <button className="ribbon-btn ribbon-btn-big" onClick={() => setOpen((o) => !o)}>
        <span className="ribbon-btn-icon">{icon}</span>
        <span className="ribbon-btn-label">
          {label} <span className="dropdown-caret">▾</span>
        </span>
      </button>
      {open && (
        <div className="ribbon-dropdown-menu">
          {options.map((opt) => (
            <button
              key={opt.key}
              className="ribbon-dropdown-item"
              onClick={() => {
                onSelect(opt.key);
                setOpen(false);
              }}
            >
              <span className="ribbon-dropdown-item-icon">{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
