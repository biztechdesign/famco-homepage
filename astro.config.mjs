import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

const repo = "famco-homepage";

// https://astro.build/config
export default defineConfig({
  site: "https://biztechdesign.github.io",
  base: `/${repo}`,
  trailingSlash: "ignore",
  output: "static",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    icon({
      include: { lucide: ["*"] },
    }),
  ],
});
