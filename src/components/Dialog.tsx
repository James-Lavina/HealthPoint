import React, { useEffect, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface DialogProps {
  open: boolean;
  labelledBy: string;
  describedBy?: string;
  onClose?: () => void;
  widthClass?: string;
  children: ReactNode;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function Dialog({
  open,
  labelledBy,
  describedBy,
  onClose,
  widthClass = 'max-w-xl',
  children
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease }}
        onClick={onClose}>
        
          <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          tabIndex={-1}
          className={`w-full ${widthClass} rounded-2xl bg-white p-10 shadow-dialog focus:outline-none`}
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.22, ease }}
          onClick={(e) => e.stopPropagation()}>
          
            {children}
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}