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
  formula: 'ans-food-diapers-formula',
  mealDelivery: 'ans-food-home-delivered-meals'
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

/**
 * Older adults who cannot leave home — home-delivered meals outrank grocery
 * pickup. A question needs a delivery signal (or the program name) plus either
 * a homebound situation or an older-adult reference such as “my dad is 74”.
 */
const HOME_BOUND_PHRASES = [
  'homebound', 'housebound', 'home bound', "can't leave home", 'cant leave home',
  'cannot leave home', "can't leave the house", 'cannot leave the house',
  'trouble leaving home', 'trouble leaving the house', 'difficulty leaving home',
  'hard to leave home', 'hard for him to leave home', 'hard for her to leave home',
  'unable to leave home', 'unable to get out', 'stuck at home', 'never leaves home',
  "doesn't leave home", 'does not leave home', 'rarely leaves home', 'leaving home',
  'get out of the house', 'no puede salir', 'no pueden salir', 'no sale de casa',
  'no sale de la casa', 'le cuesta salir', 'dificultad para salir', 'no puede salir de casa'
];

const DELIVERY_WORDS = ['delivery', 'delivered', 'deliver', 'delivers', 'entrega', 'entregas', 'entregar'];
const DELIVERY_PHRASES = [
  'meal delivery', 'meals on wheels', 'home delivered', 'home delivered meals',
  'delivered to the home', 'a domicilio', 'comida a domicilio', 'comidas a domicilio',
  'entrega a domicilio'
];

const OLDER_ADULT_WORDS = [
  'elderly', 'senior', 'seniors', 'older', 'grandfather', 'grandmother', 'grandpa',
  'grandma', 'abuelo', 'abuela', 'abuelito', 'abuelita', 'anciano', 'anciana',
  'mayor', 'mayores', 'dad', 'mom', 'mother', 'father', 'mama', 'papa', 'madre',
  'padre', 'caregiver', 'cuidador', 'cuidadora'
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

  const isDelivery =
    hasWord(normalized, DELIVERY_WORDS) || hasPhrase(padded, DELIVERY_PHRASES);
  const isHomeBound = hasPhrase(padded, HOME_BOUND_PHRASES);
  // An age such as “74” marks an older adult; ZIP codes are longer tokens, so
  // they never match here.
  const isOlderAdult = hasWord(normalized, OLDER_ADULT_WORDS) || /\b(6\d|7\d|8\d|9\d)\b/.test(normalized);
  const isMealDelivery =
    (isFood || isDelivery) &&
    (isHomeBound ||
      (isDelivery && isOlderAdult) ||
      hasPhrase(padded, [
        'meals on wheels',
        'meal delivery',
        'home delivered meals',
        'comida a domicilio',
        'comidas a domicilio',
        'comidas sobre ruedas'
      ]));

  // Someone who cannot leave home needs delivered meals, not grocery pickup.
  // This is checked before documents because “a domicilio” means delivery.
  if (isMealDelivery) return foodAnswerIds.mealDelivery;
  // Identification matters only when the question is about getting food.
  if (isDocuments && (isFood || isCalfresh)) return foodAnswerIds.documents;
  if (isFormula) return foodAnswerIds.formula;
  if (isCalfresh) return foodAnswerIds.calfresh;
  return null;
};
