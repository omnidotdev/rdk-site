import type { KnipConfig } from "knip";

/**
 * Knip configuration.
 * @see https://knip.dev/overview/configuration
 */
const knipConfig: KnipConfig = {
  entry: ["src/routes/**/*.{ts,tsx}", "src/router.tsx"],
  project: ["src/**/*.{ts,tsx,css}"],
  ignoreExportsUsedInFile: true,
  ignore: [
    "src/routeTree.gen.ts",
    "src/components/ui/**",
    "src/lib/config/env.config.ts",
  ],
  ignoreDependencies: ["tailwindcss", "tw-animate-css"],
  tags: ["-knipignore"],
  rules: {
    binaries: "off",
    unresolved: "off",
    dependencies: "off",
    unlisted: "off",
    files: "off",
  },
};

export default knipConfig;
