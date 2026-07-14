import { useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import './TextModeEditor.css';
import { useAppState, useAppDispatch } from '../../state/store';
import { buildHeaderPreviewLines, getCurrentToken, KNOWN_INSTRUCTION_NAMES } from '../../data/textMode';

interface Suggestion {
  items: string[];
  index: number;
  start: number;
  end: number;
  top: number;
  left: number;
}

const NAV_KEYS = new Set(['ArrowDown', 'ArrowUp', 'Enter', 'Tab', 'Escape']);
const LINE_HEIGHT = 19;

export function TextModeEditor() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const gutterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const charWidthRef = useRef(7.8);
  const pendingCaretRef = useRef<number | null>(null);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  const { textModeContent } = state;
  const lineCount = textModeContent === '' ? 1 : textModeContent.split('\n').length;
  const headerLines = state.view.jobAllDisplay ? buildHeaderPreviewLines(state.job, state.instHeader) : [];

  useLayoutEffect(() => {
    if (measureRef.current) {
      charWidthRef.current = measureRef.current.getBoundingClientRect().width / 20;
    }
  }, []);

  useLayoutEffect(() => {
    if (pendingCaretRef.current !== null && textareaRef.current) {
      const pos = pendingCaretRef.current;
      textareaRef.current.setSelectionRange(pos, pos);
      pendingCaretRef.current = null;
    }
  }, [textModeContent]);

  function refreshSuggestions(ta: HTMLTextAreaElement) {
    if (ta.selectionStart !== ta.selectionEnd) {
      setSuggestion(null);
      return;
    }
    const info = getCurrentToken(ta.value, ta.selectionStart);
    if (!info || info.token.length === 0) {
      setSuggestion(null);
      return;
    }
    const upper = info.token.toUpperCase();
    const items = KNOWN_INSTRUCTION_NAMES.filter((name) => name.startsWith(upper) && name !== upper).slice(0, 8);
    if (items.length === 0) {
      setSuggestion(null);
      return;
    }
    setSuggestion({
      items,
      index: 0,
      start: info.start,
      end: info.end,
      top: 4 + info.line * LINE_HEIGHT - ta.scrollTop + LINE_HEIGHT,
      left: 8 + info.column * charWidthRef.current - ta.scrollLeft,
    });
  }

  function applySuggestion(name: string) {
    if (!suggestion) return;
    const newContent = textModeContent.slice(0, suggestion.start) + name + textModeContent.slice(suggestion.end);
    pendingCaretRef.current = suggestion.start + name.length;
    dispatch({ type: 'SET_TEXT_MODE_CONTENT', content: newContent });
    setSuggestion(null);
    textareaRef.current?.focus();
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({ type: 'SET_TEXT_MODE_CONTENT', content: e.target.value });
    refreshSuggestions(e.target);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (!suggestion) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSuggestion((s) => s && { ...s, index: (s.index + 1) % s.items.length });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSuggestion((s) => s && { ...s, index: (s.index - 1 + s.items.length) % s.items.length });
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      applySuggestion(suggestion.items[suggestion.index]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setSuggestion(null);
    }
  }

  function handleKeyUp(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (NAV_KEYS.has(e.key)) return;
    if (textareaRef.current) refreshSuggestions(textareaRef.current);
  }

  function handleClick() {
    if (textareaRef.current) refreshSuggestions(textareaRef.current);
  }

  function handleScroll() {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
    if (suggestion && textareaRef.current) refreshSuggestions(textareaRef.current);
  }

  return (
    <div className="text-mode-editor">
      {headerLines.length > 0 && (
        <div className="text-mode-header-preview">
          {headerLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}
      <div className="text-mode-body">
        <div className="text-mode-gutter" ref={gutterRef}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{String(headerLines.length + i).padStart(4, '0')}</div>
          ))}
        </div>
        <div className="text-mode-textarea-wrap">
          <textarea
            ref={textareaRef}
            className="text-mode-textarea"
            value={textModeContent}
            spellCheck={false}
            onScroll={handleScroll}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onClick={handleClick}
            onBlur={() => setSuggestion(null)}
          />
          {suggestion && (
            <ul className="text-mode-suggestions" style={{ top: suggestion.top, left: suggestion.left }}>
              {suggestion.items.map((name, i) => (
                <li
                  key={name}
                  className={i === suggestion.index ? 'active' : ''}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    applySuggestion(name);
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
          <span ref={measureRef} className="text-mode-measure" aria-hidden="true">
            {'0'.repeat(20)}
          </span>
        </div>
      </div>
    </div>
  );
}
