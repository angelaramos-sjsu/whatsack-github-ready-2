import React, { useEffect, useRef } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export interface ToastMessage {
  id: number;
  text: string;
}

interface FeedbackToastProps {
  message: ToastMessage | null;
  onDismiss: () => void;
}

// Small confirmation message for save, personalization and filter actions.
export const FeedbackToast: React.FC<FeedbackToastProps> = ({ message, onDismiss }) => {
  const dismissRef = useRef(onDismiss);
  dismissRef.current = onDismiss;

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => dismissRef.current(), 4000);
    return () => window.clearTimeout(timer);
  }, [message?.id]);

  if (!message) return null;

  return (
    <div className="qc-toast" role="status" aria-live="polite">
      <CheckCircle2 aria-hidden="true" />
      <span>{message.text}</span>
      <button type="button" onClick={onDismiss} aria-label="Dismiss message">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};
