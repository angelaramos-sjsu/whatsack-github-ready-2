import React, { useEffect, useRef } from 'react';
import { X, MapPin, Bookmark, BookmarkCheck } from 'lucide-react';
import { Language } from '../types';
import { DirectoryEntry } from '../data/directory';
import { categoryLabel } from '../data/categories';
import { sourceTypeLabel } from '../data/sourceTypes';

interface DirectoryEntryDialogProps {
  entry: DirectoryEntry;
  currentLanguage: Language;
  isSaved: boolean;
  onToggleSave: (entryId: string) => void;
  onClose: () => void;
}

// Detail view for one directory listing. Only the details recorded for the
// organization are rendered, so missing fields never show empty labels.
export const DirectoryEntryDialog: React.FC<DirectoryEntryDialogProps> = ({
  entry,
  currentLanguage,
  isSaved,
  onToggleSave,
  onClose
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const en = currentLanguage === 'en';

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    headingRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      opener?.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="directory-detail-heading"
        className="bg-white rounded-3xl border border-[#ece9f7] shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#ece9f7] p-5 sm:p-6 shrink-0">
          <div>
            <div className="qc-eyebrow">{sourceTypeLabel(entry.sourceType, currentLanguage)}</div>
            <h2
              id="directory-detail-heading"
              ref={headingRef}
              tabIndex={-1}
              className="mt-1 text-xl sm:text-2xl font-medium tracking-[-0.02em] text-[#1A1A24] focus:outline-hidden"
            >
              {entry.name}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="qc-chip">{categoryLabel(entry.categoryId, currentLanguage)}</span>
              {entry.city && <span className="qc-chip">{entry.city}</span>}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={en ? 'Close details (Esc)' : 'Cerrar detalles (Esc)'}
            className="min-h-0 rounded-lg p-2 text-[#8a879f] transition-colors hover:bg-[#F3F0FF] hover:text-[#4C1D95]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 text-[#1A1A24]">
          {entry.description && (
            <p className="text-[15px] leading-relaxed text-[#5a5870]">{entry.description}</p>
          )}

          {entry.address && (
            <div className="flex items-start gap-2 text-[14px] text-[#5a5870]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8a879f]" aria-hidden="true" />
              <span>{entry.address}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 border-t border-[#f0eef8] pt-4 text-[14px]">
            <a
              href={entry.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4C1D95] underline underline-offset-4"
            >
              {en ? 'Visit website' : 'Visitar sitio web'}
            </a>
            <button
              type="button"
              onClick={() => onToggleSave(entry.id)}
              aria-pressed={isSaved}
              className="qc-btn-sm min-h-0 flex items-center gap-2"
            >
              {isSaved ? (
                <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Bookmark className="h-4 w-4" aria-hidden="true" />
              )}
              <span>
                {isSaved
                  ? (en ? 'Saved' : 'Guardado')
                  : (en ? 'Save resource' : 'Guardar recurso')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
