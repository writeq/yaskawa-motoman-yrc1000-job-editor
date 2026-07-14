import { useRef } from 'react';
import './TextModeEditor.css';
import { useAppState, useAppDispatch } from '../../state/store';
import { buildHeaderPreviewLines } from '../../data/textMode';

export function TextModeEditor() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const gutterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { textModeContent } = state;
  const lineCount = textModeContent === '' ? 1 : textModeContent.split('\n').length;
  const headerLines = state.view.jobAllDisplay ? buildHeaderPreviewLines(state.job, state.instHeader) : [];

  function handleScroll() {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
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
        <textarea
          ref={textareaRef}
          className="text-mode-textarea"
          value={textModeContent}
          spellCheck={false}
          onScroll={handleScroll}
          onChange={(e) => dispatch({ type: 'SET_TEXT_MODE_CONTENT', content: e.target.value })}
        />
      </div>
    </div>
  );
}
