import React, { useEffect, useRef } from 'react';

interface CopilotPopoutProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the floating chat panel. */
  label: string;
  children: React.ReactNode;
}

/**
 * Floating co-pilot panel. Sits over the page in the bottom-right corner so the
 * chat stays one click away from anywhere, and closes with Esc or the × control.
 */
export const CopilotPopout: React.FC<CopilotPopoutProps> = ({ open, onClose, label, children }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <section
      id="civic-copilot-panel"
      role="dialog"
      aria-modal="false"
      aria-label={label}
      aria-hidden={!open}
      className={`cp-pop ${open ? 'is-open' : ''}`}
    >
      <div ref={panelRef} tabIndex={-1} className="cp-pop-panel">
        {children}
      </div>
    </section>
  );
};
