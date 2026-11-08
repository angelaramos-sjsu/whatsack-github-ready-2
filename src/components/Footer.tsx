import React from 'react';
import { CategoryId, Language } from '../types';
import { translations } from '../data/translations';
import { directoryCategories } from '../data/categories';
import { CategoryGlyph } from './CategoryGlyph';

interface FooterProps {
  currentLanguage: Language;
  onOpenDisclaimer: () => void;
  onNavigateCategory: (category: CategoryId | 'all') => void;
  onGoHome: () => void;
  onOpenExtension: () => void;
  onOpenDecoderModal: () => void;
  onOpenVoiceModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLanguage,
  onOpenDisclaimer,
  onNavigateCategory,
  onGoHome,
  onOpenExtension,
  onOpenDecoderModal,
  onOpenVoiceModal
}) => {
  const t = translations[currentLanguage];
  const en = currentLanguage === 'en';

  return (
    <footer className="qc-ft">
      <div className="qc-shell qc-ftg">
        <div>
          <div className="bn">{t.app.name}</div>
          <p>{t.app.slogan}</p>
          <button type="button" className="c min-h-0" onClick={onGoHome}>
            {en ? 'Back to homepage' : 'Volver al inicio'}
          </button>
          <button type="button" className="disc min-h-0" onClick={onOpenDisclaimer}>
            {en ? 'Research Prototype Disclaimer' : 'Aviso de Prototipo de Investigación'}
          </button>
          <div className="qc-yr">{en ? 'Silicon Valley 2026' : 'Silicon Valley 2026'}</div>
        </div>

        <div>
          <h4>{en ? 'Resource categories' : 'Categorías de recursos'}</h4>
          {directoryCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="c min-h-0 inline-flex items-center gap-2"
              onClick={() => onNavigateCategory(category.id)}
            >
              <CategoryGlyph id={category.id} className="h-4 w-4 text-[#4C1D95]" />
              {category.name[currentLanguage]}
            </button>
          ))}
          <button type="button" className="c min-h-0" onClick={() => onNavigateCategory('all')}>
            {en ? 'All resources' : 'Todos los recursos'}
          </button>
        </div>

        <div>
          <h4>{en ? 'Interactive tools' : 'Herramientas interactivas'}</h4>
          <button type="button" className="c min-h-0" onClick={onOpenExtension}>
            {t.nav.extension}
          </button>
          <button type="button" className="c min-h-0" onClick={onOpenDecoderModal}>
            {t.nav.docDecoder}
          </button>
          <button type="button" className="c min-h-0" onClick={onOpenVoiceModal}>
            {t.nav.voice}
          </button>
        </div>
      </div>
    </footer>
  );
};
