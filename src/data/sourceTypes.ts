import { Language, SourceTypeId } from '../types';

export interface SourceTypeInfo {
  id: SourceTypeId;
  name: { en: string; es: string };
}

// Human-readable labels for the kind of organization behind a listing.
export const sourceTypes: SourceTypeInfo[] = [
  { id: 'government', name: { en: 'Government agency', es: 'Agencia gubernamental' } },
  { id: 'nonprofit', name: { en: 'Nonprofit organization', es: 'Organización sin fines de lucro' } },
  { id: 'food-bank', name: { en: 'Food bank or food pantry', es: 'Banco de alimentos o despensa' } },
  {
    id: 'healthcare',
    name: { en: 'Healthcare or mental health provider', es: 'Proveedor de salud o salud mental' }
  },
  { id: 'school', name: { en: 'School or educational institution', es: 'Escuela o institución educativa' } },
  { id: 'workforce', name: { en: 'Workforce organization', es: 'Organización de empleo y capacitación' } },
  { id: 'community-center', name: { en: 'Community center', es: 'Centro comunitario' } },
  {
    id: 'legal-social',
    name: { en: 'Legal or social services organization', es: 'Organización legal o de servicios sociales' }
  },
  { id: 'hotline', name: { en: 'Hotline or crisis support', es: 'Línea directa o apoyo en crisis' } },
  { id: 'online-directory', name: { en: 'Online resource or directory', es: 'Recurso o directorio en línea' } },
  { id: 'other', name: { en: 'Other resources', es: 'Otros recursos' } }
];

export const sourceTypeLabel = (id: SourceTypeId, language: Language): string => {
  const match = sourceTypes.find((type) => type.id === id);
  return match ? match.name[language] : id;
};
