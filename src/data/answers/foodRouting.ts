/**
 * Food-question routing.
 *
 * Free-text food questions are checked here before the general topic router, so
 * a specific concern — a CalFresh application, identification or documents, or
 * infant formula — never collapses into the generic grocery answer.
 *
 * Matching is deliberately forgiving: text is lowercased, curly quotes become
 * straight ones, punctuation is dropped and Spanish accents are folded, so
 * “I’ve never applied for CalFresh?” and “no tengo identificación” both match.
 */

/** The reviewed food answers this router may point at. */
export const foodAnswerIds = {
  groceries: 'ans-food-east-sj-groceries',
  calfresh: 'ans-food-calfresh-help',
  documents: 'ans-food-proof-of-address',
  formula: 'ans-food-diapers-formula'
} as const;

/** Case-, punctuation-, quote- and accent-insensitive form used for matching. */
export const normalizeQuestionText = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[\u2018\u2019\u201a\u201b\u2032\u00b4`]/g, "'")
    .replace(/[\u201c\u201d\u201e\u201f\u2033]/g, '"')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9' ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const wordsOf = (normalized: string): string[] => normalized.split(' ').filter(Boolean);

const hasWord = (normalized: string, list: string[]): boolean => {
  const words = wordsOf(normalized);
  return list.some((word) => words.includes(word));
};

/** Prefix match for longer stems, so document/documentos/identificación all hit. */
const hasStem = (normalized: string, list: string[]): boolean => {
  const words = wordsOf(normalized);
  return list.some((stem) => words.some((word) => word.length > stem.length && word.startsWith(stem)));
};

const hasPhrase = (padded: string, list: string[]): boolean =>
  list.some((phrase) => padded.includes(` ${normalizeQuestionText(phrase)} `));

/** General food/grocery vocabulary (English and Spanish). */
const FOOD_WORDS = [
  'food', 'foods', 'grocery', 'groceries', 'grocer', 'pantry', 'pantries',
  'meal', 'meals', 'hungry', 'comida', 'comidas', 'alimento', 'alimentos',
  'despensa', 'despensas', 'comestibles', 'abarrotes', 'hambre'
];

/** CalFresh / SNAP application vocabulary. */
const CALFRESH_WORDS = ['calfresh', 'snap', 'ebt', 'cupones', 'cupon', 'estampillas', 'benefitscal'];
const CALFRESH_PHRASES = [
  'cal fresh', 'food stamp', 'food stamps', 'cupones de alimentos', 'estampillas de comida'
];

/** Infant formula and diapers — the reviewed answer covers both. */
const FORMULA_WORDS = ['formula', 'wic', 'diaper', 'diapers', 'panal', 'panales', 'biberon'];
const FORMULA_PHRASES = [
  'infant formula', 'baby formula', 'leche infantil', 'leche en polvo', 'leche de bebe',
  'formula para bebe', 'suplemento de leche'
];

/** Identification, documents and proof of address — distinct from a photo ID. */
const DOCUMENT_WORDS = [
  'id', 'ids', 'address', 'proof', 'papers', 'paperwork', 'papeles', 'licencia', 'pasaporte',
  'passport', 'domicilio', 'direccion', 'residencia', 'residency', 'ssn'
];
const DOCUMENT_STEMS = ['document', 'identific', 'credencial', 'consular', 'matricul', 'comprobante'];
const DOCUMENT_PHRASES = [
  'photo id', 'id card', 'proof of address', 'proof of residency', 'proof of id',
  'social security', 'seguro social', 'birth certificate', 'acta de nacimiento',
  'matricula consular', 'consular id', 'tarjeta de identidad'
];

/**
 * The reviewed food answer id for a free-text question, or null when the
 * question is not food-specific (the general topic router then takes over).
 */
export const routeFoodQuestion = (text: string): string | null => {
  const normalized = normalizeQuestionText(text);
  if (!normalized) return null;
  const padded = ` ${normalized} `;

  const isFood = hasWord(normalized, FOOD_WORDS);
  const isCalfresh =
    hasWord(normalized, CALFRESH_WORDS) || hasPhrase(padded, CALFRESH_PHRASES);
  const isFormula = hasWord(normalized, FORMULA_WORDS) || hasPhrase(padded, FORMULA_PHRASES);
  const isDocuments =
    hasWord(normalized, DOCUMENT_WORDS) ||
    hasStem(normalized, DOCUMENT_STEMS) ||
    hasPhrase(padded, DOCUMENT_PHRASES);

  // Identification matters only when the question is about getting food.
  if (isDocuments && (isFood || isCalfresh)) return foodAnswerIds.documents;
  if (isFormula) return foodAnswerIds.formula;
  if (isCalfresh) return foodAnswerIds.calfresh;
  return null;
};
