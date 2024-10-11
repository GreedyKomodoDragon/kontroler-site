import { KNOWN_LANGUAGES, KNOWN_LANGUAGE_CODES } from "./consts";
export { KNOWN_LANGUAGES, KNOWN_LANGUAGE_CODES };

export const langPathRegex = /\/([a-z]{2}-?[A-Z]{0,2})\//;
export const versionPathRegex = /v\d+/;

export function getLanguageFromURL(pathname: string) {
  const langCodeMatch = pathname.match(langPathRegex);
  const langCode = langCodeMatch ? langCodeMatch[1] : "en";
  return langCode as (typeof KNOWN_LANGUAGE_CODES)[number];
}

export function getVersionFromURL(pathname: string) {
  const versionCodeMatch = versionPathRegex.exec(pathname);
  const versionCode = versionCodeMatch ? versionCodeMatch[0] : "v010";

  return versionCode;
}

export function convertVersionString(versionString) {
  const numericPart = versionString.match(/\d+$/);

  if (!numericPart) {
    return versionString;
  }

  const digits = numericPart[0].split("");
  return `v${digits.join(".")}`;
}
