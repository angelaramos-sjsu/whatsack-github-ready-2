import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLanguage: Language;
  onOpenDisclaimer: () => void;
  onNavigateCategory: (cat: any) => void;
  onOpenExtension: () => void;
  onOpenDecoderModal: () => void;
  onOpenVoiceModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLanguage,
  onOpenDisclaimer,
  onNavigateCategory,
  onOpenExtension,
  onOpenDecoderModal,
  onOpenVoiceModal
}) => {
  const t = translations[currentLanguage];

  return (
    <footer className="qc-ft">
      <div className="qc-shell qc-ftg">
        <div>
          <div className="bn">{t.app.name}</div>
          <p>{t.app.slogan}</p>
          <button type="button" className="disc min-h-0" onClick={onOpenDisclaimer}>
            {currentLanguage === 'en' ? 'Research Prototype Disclaimer' : 'Aviso de Prototipo de Investigación'}
          </button>
          <div className="qc-yr">{currentLanguage === 'en' ? 'Silicon Valley 2026' : 'Silicon Valley 2026'}</div>
        </div>

        <div>
          <h4>{currentLanguage === 'en' ? 'Core Categories' : 'Categorías'}</h4>
          <button type="button" className="c min-h-0" onClick={() => onNavigateCategory('food')}>
            {t.categories.food}
          </button>
          <button type="button" className="c min-h-0" onClick={() => onNavigateCategory('mental-health')}>
            {t.categories.mentalHealth}
          </button>
          <button type="button" className="c min-h-0" onClick={() => onNavigateCategory('workforce')}>
            {t.categories.workforce}
          </button>
          <button type="button" className="c min-h-0" onClick={() => onNavigateCategory('community')}>
            {t.categories.community}
          </button>
        </div>

        <div>
          <h4>{currentLanguage === 'en' ? 'Interactive Tools' : 'Herramientas Interactivas'}</h4>
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
