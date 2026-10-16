/**
 * The site speaks English and French. Every route lives under /en or /fr
 * (src/app/[lang]); src/proxy.ts sends a bare URL to the visitor's language.
 *
 * Copy is written once, side by side, as `t("English", "Français")`, and
 * `localize()` turns a whole content tree into plain strings for one language.
 */

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Remembers an explicit choice from the language switch, so "/" keeps honouring it. */
export const LOCALE_COOKIE = "lang";

export const isLocale = (value: unknown): value is Locale => locales.includes(value as Locale);

/** Each language named in itself, for the switch. */
export const localeNames: Record<Locale, string> = { en: "English", fr: "Français" };

/** One piece of copy in every language the site speaks. */
export class Tr {
  constructor(
    readonly en: string,
    readonly fr: string,
  ) {}
}

export const t = (en: string, fr: string) => new Tr(en, fr);

/** `T` with every `Tr` replaced by a plain string. */
export type Localized<T> = T extends Tr
  ? string
  : T extends readonly (infer U)[]
    ? Localized<U>[]
    : T extends object
      ? { [K in keyof T]: Localized<T[K]> }
      : T;

/**
 * French puts a space before : ; ! ? » and after «. It is written here as a
 * plain space and made non-breaking on the way out, so a line never starts
 * with a lone "?".
 */
const frenchSpacing = (s: string) => s.replace(/ ([:;!?»])/g, " $1").replace(/« /g, "« ");

/** In either language, an em dash stays with the word before it rather than opening a line. */
const keepDashes = (s: string) => s.replace(/ —/g, " —");

export function localize<T>(value: T, lang: Locale): Localized<T> {
  if (value instanceof Tr) {
    return keepDashes(lang === "fr" ? frenchSpacing(value.fr) : value.en) as Localized<T>;
  }
  if (Array.isArray(value)) return value.map((item) => localize(item, lang)) as Localized<T>;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, localize(item, lang)]),
    ) as Localized<T>;
  }
  return value as Localized<T>;
}

/** An in-site path in `lang`: ("fr", "/projects/wazalink") -> "/fr/projects/wazalink", ("fr", "/#work") -> "/fr#work". */
export function localeHref(lang: Locale, href: string) {
  if (href === "/") return `/${lang}`;
  if (href.startsWith("/#")) return `/${lang}${href.slice(1)}`;
  return `/${lang}${href}`;
}

/** An in-site link for content files, kept in the visitor's language: page("/projects/wazalink") reads "/fr/projects/wazalink" on the French site. */
export const page = (path: string) => t(localeHref("en", path), localeHref("fr", path));

/** The same page in another language: ("/en/projects/wazalink", "fr") -> "/fr/projects/wazalink". */
export function switchLocale(pathname: string, lang: Locale) {
  const rest = pathname.replace(/^\/[^/]+/, "");
  return `/${lang}${rest}`;
}

/** Canonical and hreflang links for one page: alternates("fr", "/projects/wazalink"). */
export function alternates(lang: Locale, path: string) {
  return {
    canonical: localeHref(lang, path),
    languages: {
      ...Object.fromEntries(locales.map((code) => [code, localeHref(code, path)])),
      "x-default": localeHref(defaultLocale, path),
    },
  };
}

/** "Open {title}" + { title: "KamJob" } -> "Open KamJob". */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
