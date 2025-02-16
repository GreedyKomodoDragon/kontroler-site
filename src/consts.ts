export const SITE = {
  title: "Kontroler",
  description:
    "Kubernetes-Native DAG creation & Management tool to simplify running connected jobs in an event driven or scheduled manner",
  defaultLanguage: "en-us",
} as const;

export const OPEN_GRAPH = {
  image: {
    src: "https://github.com/GreedyKomodoDragon/kontroler-site/blob/main/open.png?raw=true",
    alt: "Kontroler logo",
  },
};

export const KNOWN_LANGUAGES = {
  English: "en",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/GreedyKomodoDragon/kontroler-site/tree/main/src/content/docs`;

export const COMMUNITY_INVITE_URL = ``;

export type Sidebar = Record<
  (typeof KNOWN_LANGUAGE_CODES)[number],
  Record<string, Record<string, { text: string; link: string }[]>>
>;
export const SIDEBAR: Sidebar = {
  en: {
    v0110: {
      Kontroler: [
        { text: "Introduction", link: "en/v0110/kontroler/introduction" },
        { text: "Architecture", link: "en/v0110/kontroler/architecture" },
        { text: "Open Source", link: "en/v0110/kontroler/opensource" },
      ],

      Examples: [
        { text: "Introduction", link: "en/v0110/kontroler/introduction" },
      ],
    },
  },
};

export const KNOWN_VERSIONS = ["v0.11.0"];
