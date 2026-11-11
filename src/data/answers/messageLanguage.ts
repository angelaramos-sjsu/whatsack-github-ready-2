/**
 * Language of a single typed chatbot message.
 *
 * The copilot replies in the language of the user's latest message, using the
 * reviewed English/Spanish copy that already exists for every answer. This
 * detector never translates anything: it only decides which side of a reviewed
 * bilingual answer to show.
 *
 * It returns `null` for anything that is not clearly one language, and the
 * caller then keeps the conversation's current language. That covers short
 * neutral replies (“OK”), acronyms and program names (“CalFresh”, “WIC”), city
 * names and ZIP codes — none of which say anything about language.
 */
import type { Language } from '../../types';
import { normalizeQuestionText } from './foodRouting';

/** Explicit instructions, checked before any word counting. */
const SPANISH_REQUESTS = [
  'responde en espanol',
  'responder en espanol',
  'contesta en espanol',
  'contestame en espanol',
  'habla en espanol',
  'hablame en espanol',
  'escribeme en espanol',
  'hable en espanol',
  'en espanol por favor',
  'por favor en espanol',
  'answer in spanish',
  'respond in spanish',
  'reply in spanish',
  'speak spanish',
  'in spanish please',
  'spanish please'
];

const ENGLISH_REQUESTS = [
  'answer in english',
  'respond in english',
  'reply in english',
  'speak english',
  'in english please',
  'english please',
  'please answer in english',
  'please respond in english',
  'please reply in english',
  'responde en ingles',
  'contesta en ingles',
  'habla en ingles',
  'en ingles por favor'
];

/** Function words, verb forms and Spanish-only spellings. */
const SPANISH_WORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'este', 'esta', 'estos', 'estas',
  'mi', 'mis', 'tu', 'tus', 'su', 'sus', 'nuestro', 'nuestra',
  'de', 'del', 'en', 'con', 'por', 'para', 'sin', 'sobre', 'entre', 'y', 'pero', 'que',
  'como', 'cuando', 'donde', 'porque',
  'es', 'estan', 'estoy', 'estas', 'estamos', 'soy', 'eres', 'somos', 'seria',
  'tengo', 'tienes', 'tiene', 'tenemos', 'necesito', 'necesitamos', 'necesitas',
  'necesita', 'necesitan', 'quiero', 'quieres', 'quiere', 'quieren', 'queremos',
  'quisiera', 'puedo', 'puedes', 'puede', 'pueden', 'podemos', 'podria', 'podrian',
  'hay', 'vivo', 'vives', 'vive', 'hacer', 'hago', 'haga',
  'ayuda', 'ayudame', 'ayudar', 'ayudarme', 'ayudarle', 'ayudarnos', 'ayudarlos',
  'ayudarlas', 'aplicar', 'aplico', 'solicitar', 'solicitud', 'calificar',
  'obtener', 'recibir', 'encontrar', 'buscar', 'conseguir', 'pagar', 'trabajar',
  'comer', 'llevar', 'pedir', 'preguntar', 'llamar', 'saber', 'decir',
  'quien', 'cual', 'cuanto', 'cuanta', 'cuantos', 'cuantas',
  'muy', 'mas', 'tambien', 'ahora', 'hoy', 'manana', 'favor', 'gracias', 'hola',
  'buenos', 'dias', 'tardes', 'noches', 'algo', 'todo', 'todos', 'solo', 'solamente',
  'familia', 'hijo', 'hija', 'hijos', 'nino', 'nina', 'ninos', 'ninas',
  'abuelo', 'abuela', 'mama', 'papa', 'comida', 'despensa', 'trabajo', 'dinero',
  'identificacion', 'identificaciones', 'documentos', 'domicilio', 'cita', 'tarjeta',
  'cupones', 'estampillas',
  'informacion', 'programa', 'programas', 'recurso', 'recursos', 'servicio',
  'servicios', 'comunidad', 'condado', 'estado', 'gratuito', 'gratuitos', 'salud',
  'escuela', 'empleo', 'beneficio', 'beneficios', 'ingresos', 'aplicacion',
  'formulario', 'requisitos', 'pregunta', 'respuesta'
]);

/** Function words, verb forms and English-only spellings. */
const ENGLISH_WORDS = new Set([
  'the', 'an', 'is', 'are', 'was', 'were', 'am', 'be', 'been', 'being',
  'i', 'you', 'your', 'we', 'our', 'us', 'they', 'them', 'their', 'he', 'she', 'it', 'its',
  'my', 'mine', 'his', 'her', 'this', 'that', 'these', 'those',
  'what', 'which', 'who', 'whom', 'whose', 'when', 'where', 'why', 'how',
  'do', 'does', 'did', 'done', "don't", "doesn't", "didn't", "isn't", "aren't",
  "can't", "couldn't", "won't", "i'm", "im", "what's", "you're", "we're", "let's",
  'can', 'could', 'should', 'would', 'will',
  'may', 'might', 'must', 'need', 'needs', 'needed', 'want', 'wants',
  'have', 'has', 'had', 'get', 'got', 'apply', 'applying', 'application',
  'help', 'please', 'thanks', 'thank', 'hello', 'hi', 'hey', 'yes', 'not',
  'and', 'or', 'but', 'if', 'then', 'than', 'so', 'to', 'for', 'with', 'from',
  'of', 'in', 'on', 'at', 'by', 'about', 'into', 'over', 'under', 'again', 'also',
  'now', 'today', 'tomorrow', 'family', 'child', 'children', 'kids',
  'living', 'live', 'lives', 'pay', 'paying', 'work', 'working', 'job', 'school',
  'college', 'scholarship', 'documents', 'address', 'county', 'city', 'groceries',
  'grocery', 'pantry',
  'program', 'programs', 'information', 'resource', 'resources', 'service',
  'services', 'community', 'state', 'free', 'eligibility', 'eligible', 'income',
  'benefit', 'benefits', 'form', 'forms', 'submit', 'submitting', 'online',
  'phone', 'call', 'office', 'hours', 'location', 'here', 'there',
  'identification', 'morning', 'afternoon'
]);

/** Spanish-only orthography: inverted marks and characters English never uses. */
const SPANISH_LETTERS = /[ñáéíóúü]/i;
const SPANISH_MARKS = /[¿¡]/;

/**
 * The language a typed message clearly asks to be answered in, or `null` when
 * the message does not settle it (ambiguous, neutral, or genuinely mixed).
 */
export const detectMessageLanguage = (text: string): Language | null => {
  const normalized = normalizeQuestionText(text);
  if (!normalized) return null;
  const padded = ` ${normalized} `;

  const wantsSpanish = SPANISH_REQUESTS.some((phrase) => padded.includes(` ${phrase} `));
  const wantsEnglish = ENGLISH_REQUESTS.some((phrase) => padded.includes(` ${phrase} `));
  if (wantsSpanish && !wantsEnglish) return 'es';
  if (wantsEnglish && !wantsSpanish) return 'en';

  const words = normalized.split(' ').filter(Boolean);
  // “OK”, “WIC”, “CalFresh”, “95112”: a single token carries no language signal.
  if (words.length < 2) return null;

  let spanishWords = 0;
  let englishWords = 0;
  for (const word of words) {
    if (SPANISH_WORDS.has(word)) spanishWords += 1;
    else if (ENGLISH_WORDS.has(word)) englishWords += 1;
  }

  // “¿”, “¡”, “ñ” and Spanish accents cannot decide a message on their own —
  // “San José” is still just a place name — but they break a tie between words
  // and confirm a lone Spanish word such as “¿Puedo?”.
  const hasSpanishOrthography = SPANISH_MARKS.test(text) || SPANISH_LETTERS.test(text);

  if (spanishWords === englishWords) {
    return spanishWords > 0 && hasSpanishOrthography ? 'es' : null;
  }

  const winner: Language = spanishWords > englishWords ? 'es' : 'en';
  const winningScore = Math.max(spanishWords, englishWords);
  if (winningScore >= 2) return winner;
  return winner === 'es' && hasSpanishOrthography ? 'es' : null;
};
