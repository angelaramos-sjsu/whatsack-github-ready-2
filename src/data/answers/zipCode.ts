import type { BilingualText } from './types';

/**
 * A message that is nothing but a five-digit ZIP code.
 *
 * A bare ZIP is location information, not a language choice and not a question:
 * the caller keeps the conversation's current language and answers with the
 * next step for the need already on the table.
 */
export const parseZipCodeOnlyMessage = (text: string): string | null => {
  const match = text.trim().match(/^(\d{5})[.!]?$/);
  return match ? match[1] : null;
};

/** No need established yet: ask what kind of help is wanted near that ZIP. */
export const zipCodeHelpPrompt = (zip: string): BilingualText => ({
  en: `What kind of help are you looking for near ZIP code ${zip}?\n\nI can help with free groceries, emotional support, job training, or help for an older adult. Tell me what you need and I'll give you the next step.`,
  es: `¿Qué tipo de ayuda buscas cerca del código postal ${zip}?\n\nPuedo ayudar con alimentos gratuitos, apoyo emocional, capacitación o empleo, o ayuda para una persona mayor. Dime qué necesitas y te doy el siguiente paso.`
});

/**
 * The need on the table was groceries: hand over the reviewed Second Harvest
 * locator and tell the user to search the ZIP there. Nothing is invented — this
 * prototype does not look up sites, so it never claims to have found any.
 */
export const zipCodeGroceriesReply = (zip: string): BilingualText => ({
  en: `**Free groceries near ZIP code ${zip} — next step:**

1. Open the **Second Harvest of Silicon Valley — Food Locator**: https://www.shfb.org/get-food/
2. Enter **${zip}** in the locator's search and look at the results.

The locator shows the pantries and free meal sites serving that ZIP, with their days and hours. I did not look up specific sites for ${zip} in this chat, so the locator is what shows which ones are current.

You can also call the Food Connection team at **1-800-984-3663**.

Schedules and site rules change: confirm on the official page before you go.`,
  es: `**Alimentos gratuitos cerca del código postal ${zip} — siguiente paso:**

1. Abre el **Localizador de Alimentos de Second Harvest of Silicon Valley**: https://www.shfb.org/get-food/
2. Escribe **${zip}** en el buscador del localizador y revisa los resultados.

El localizador muestra las despensas y los sitios de comidas gratuitas que atienden ese código postal, con sus días y horarios. En este chat no consulté sitios específicos para ${zip}, así que el localizador es lo que muestra cuáles están vigentes.

También puedes llamar al equipo Food Connection al **1-800-984-3663**.

Los horarios y las reglas de cada sitio cambian: confirma en la página oficial antes de ir.`
});
