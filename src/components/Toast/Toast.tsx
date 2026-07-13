import { useEffect } from 'react';
import './Toast.css';
import { useAppDispatch, useAppState } from '../../state/store';

export function Toast() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const { toast } = state;

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 3500);
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.kind}`} onClick={() => dispatch({ type: 'CLEAR_TOAST' })}>
      {toast.text}
    </div>
  );
}
