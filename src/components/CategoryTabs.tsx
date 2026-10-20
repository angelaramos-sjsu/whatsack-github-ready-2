import React from 'react';
import { CategoryId, Language } from '../types';
import { categoriesData } from '../data/resources';
import { translations } from '../data/translations';
import { 
  Utensils, 
  HeartHandshake, 
  GraduationCap, 
  Users, 
  LayoutGrid 
} from 'lucide-react';

interface CategoryTabsProps {
  currentLanguage: Language;
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  resourceCounts: Record<string, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  currentLanguage,
  selectedCategory,
  onSelectCategory,
  resourceCounts
}) => {
  const t = translations[currentLanguage];

  const getIcon = (id: CategoryId) => {
    switch (id) {
      case 'food':
        return <Utensils className="w-5 h-5 text-emerald-700" aria-hidden="true" />;
      case 'mental-health':
        return <HeartHandshake className="w-5 h-5 text-purple-700" aria-hidden="true" />;
      case 'workforce':
        return <GraduationCap className="w-5 h-5 text-indigo-700" aria-hidden="true" />;
      case 'community':
        return <Users className="w-5 h-5 text-amber-700" aria-hidden="true" />;
    }
  };

  const totalCount = Object.values(resourceCounts).reduce((a, b) => a + b, 0);

  return (
    <section aria-labelledby="categories-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="categories-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {currentLanguage === 'en' ? 'Core Community Resource Categories' : 'Categorías Principales de Recursos'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
            {currentLanguage === 'en' 
              ? 'Select a category to view verified programs with transparent eligibility.' 
              : 'Seleccione una categoría para consultar programas con criterios transparentes.'}
          </p>
        </div>
      </div>

      <div role="tablist" aria-label="Resource Categories" className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* All Categories Option */}
        <button
          role="tab"
          id="tab-all"
          aria-selected={selectedCategory === 'all'}
          aria-controls="resource-grid"
          onClick={() => onSelectCategory('all')}
          className={`p-4 rounded-3xl border-2 text-left transition-all flex flex-col justify-between min-h-[110px] ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-3 ring-emerald-500/40'
              : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-3">
            <div className={`p-2.5 rounded-2xl ${
              selectedCategory === 'all' ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-slate-800'
            }`}>
              <LayoutGrid className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${
              selectedCategory === 'all' 
                ? 'bg-slate-800 text-white border-slate-700' 
                : 'bg-slate-100 text-slate-800 border-slate-300'
            }`}>
              {totalCount}
            </span>
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base block mb-0.5 leading-snug">
              {t.categories.all}
            </span>
            <span className={`text-xs line-clamp-1 ${
              selectedCategory === 'all' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {currentLanguage === 'en' ? 'All local programs' : 'Todos los programas'}
            </span>
          </div>
        </button>

        {/* 4 Core Categories */}
        {categoriesData.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = resourceCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              role="tab"
              id={`tab-${cat.id}`}
              aria-selected={isSelected}
              aria-controls="resource-grid"
              onClick={() => onSelectCategory(cat.id)}
              className={`p-4 rounded-3xl border-2 text-left transition-all flex flex-col justify-between min-h-[110px] ${
                isSelected
                  ? 'bg-white border-emerald-700 shadow-md ring-3 ring-emerald-700/25'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className={`p-2.5 rounded-2xl ${
                  isSelected ? 'bg-emerald-100' : 'bg-slate-100'
                }`}>
                  {getIcon(cat.id)}
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${
                  isSelected 
                    ? 'bg-emerald-100 text-emerald-950 border-emerald-300' 
                    : 'bg-slate-100 text-slate-800 border-slate-300'
                }`}>
                  {count}
                </span>
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base block text-slate-900 mb-0.5 leading-snug">
                  {cat.name[currentLanguage]}
                </span>
                <span className="text-xs text-slate-700 line-clamp-1 font-medium">
                  {cat.tagline[currentLanguage]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
