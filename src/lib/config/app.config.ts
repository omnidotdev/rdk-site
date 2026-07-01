/**
 * Application configuration.
 */
const app = {
  name: "Reality Development Kit",
  description:
    "Unified API for web-based XR experiences. Build once with React and Three.js, deploy everywhere.",
  url: "https://rdk.omni.dev",
  docsUrl: "https://docs.omni.dev",
  repoUrl: "https://github.com/omnidotdev/rdk",
  socials: {
    discord: "https://discord.gg/omnidotdev",
    x: "https://x.com/omnidotdev",
  },
  // Legal links mirror the omni-api catalog SSOT
  legal: {
    privacy: "https://omni.dev/legal/privacy",
    terms: "https://omni.dev/legal/terms",
  },
  organization: {
    name: "Omni",
    supportEmailAddress: "support@omni.dev",
  },
  /** PWA configuration. Values should match public/manifest.json. */
  pwa: {
    themeColor: "#000000",
    backgroundColor: "#000000",
  },
};

export default app;
