import { CategoryId, Language } from '../types';
import { translations } from './translations';

export interface DirectoryCategoryInfo {
  id: CategoryId;
  name: { en: string; es: string };
}

// Order used by the resource directory tabs and the source-type groupings.
export const directoryCategories: DirectoryCategoryInfo[] = [
  { id: 'food', name: { en: 'Food Access', es: 'Acceso a Alimentos' } },
  { id: 'mental-health', name: { en: 'Mental Health', es: 'Salud Mental' } },
  { id: 'education', name: { en: 'Education', es: 'Educación' } },
  { id: 'workforce', name: { en: 'Workforce and Employment', es: 'Empleo y Capacitación Laboral' } },
  { id: 'community', name: { en: 'Community Connection', es: 'Conexión Comunitaria' } }
];

export const categoryLabel = (id: CategoryId, language: Language): string => {
  const match = directoryCategories.find((category) => category.id === id);
  return match ? match.name[language] : id;
};

const descriptionKeys: Record<CategoryId, keyof typeof translations.en.categories> = {
  food: 'foodDesc',
  'mental-health': 'mentalHealthDesc',
  education: 'educationDesc',
  workforce: 'workforceDesc',
  community: 'communityDesc'
};

// Short, plain-language explanation of each category, shared by the homepage,
// navigation menu and sidebar.
export const categoryDescription = (id: CategoryId, language: Language): string => {
  return translations[language].categories[descriptionKeys[id]];
};
