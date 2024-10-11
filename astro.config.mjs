import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";
import vercelStatic from "@astrojs/vercel/static";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact(),
    react(),
    sitemap(),
  ],
  site: `https://www.kontroler.com`,
  output: "static",
  adapter: vercelStatic({
    analytics: true,
  }),
  server: {
    middleware: {
        // Example middleware to block a certain user agent
        async apply(server) {
            server.use((req, res, next) => {
                const userAgent = req.headers['user-agent'];
                const blockedUserAgent = 'Bytespider';

                if (userAgent.includes(blockedUserAgent)) {
                    return res.status(403).send('Forbidden');
                }
                next();
            });
        },
    },
},
});
