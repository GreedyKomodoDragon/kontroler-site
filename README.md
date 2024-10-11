# Kontroler Site

This is the offical documentation for kontroler and its clients.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## Customisation

### Site metadata

`src/consts.ts` contains several data objects that describe metadata about your site like title, description, default language, and Open Graph details. You can customize these to match your project.

## Page metadata

Kontroler uses frontmatter in Markdown pages to choose layouts and pass properties to those layouts. If you are using the default layout, you can customize the page in many different ways to optimize SEO and other things. For example, you can use the `title` and `description` properties to set the document title, meta title, meta description, and Open Graph description.

```markdown
---
title: Example title
description: Really cool docs example that uses Astro
layout: ../../layouts/MainLayout.astro
---

# Page content...
```

For more SEO related properties, look at `src/components/HeadSEO.astro`

### Sidebar navigation

The sidebar navigation is controlled by the `SIDEBAR` variable in your `src/consts.ts` file. You can customize the sidebar by modifying this object. A default, starter navigation has already been created for you.

### Multiple Languages support

The Kontrolers docs is attempting to support multiple languages. Know language we don't support? Open an merge request and we will review it!

```diff
 📂 src/content/docs
 ┣ 📂 en
 ┃ ┣ 📜 page-1.md
 ┃ ┣ 📜 page-2.md
+ ┣ 📂 es
+ ┃ ┣ 📜 page-1.md
+ ┃ ┣ 📜 page-2.md
```

### Search

[Algolia](https://www.algolia.com/) offers a free service to qualified open source projects called [DocSearch](https://docsearch.algolia.com/). If you are accepted to the DocSearch program, provide your API Key & index name in `src/consts.ts` and a search box will automatically appear in your site header.

Note that Algolia and Astro are not affiliated. We have no say over acceptance to the DocSearch program.

If you'd prefer to remove Algolia's search and replace it with your own, check out the `src/components/Header.astro` component to see where the component is added.
