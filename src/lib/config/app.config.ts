/**
 * Application configuration.
 */
const app = {
  name: "Reality Development Kit",
  // Catalog name, symbol, and description mirror the omni-api product catalog SSOT
  shortName: "RDK",
  icon: "⊗",
  description:
    "A React-first framework for building web-based XR experiences, from AR to VR, orchestrated through one unified API powered by Three.js and react-three-fiber.",
  url: "https://rdk.omni.dev",
  docsUrl: "https://docs.omni.dev/products/rdk",
  tutorialUrl: "https://docs.omni.dev/products/rdk/tutorial",
  repoUrl: "https://github.com/omnidotdev/rdk",
  socials: {
    discord: "https://discord.gg/omnidotdev",
    x: "https://x.com/omnidotdev",
  },
  // Legal links mirror the omni-api catalog SSOT
  legal: {
    privacy: "https://omni.dev/legal/privacy",
    terms: "https://omni.dev/legal/terms",
    cookies: "https://omni.dev/legal/cookies",
  },
  organization: {
    name: "Omni",
    url: "https://omni.dev",
    supportEmailAddress: "support@omni.dev",
  },
  /** Browser chrome colors */
  pwa: {
    themeColor: "#000000",
    backgroundColor: "#000000",
  },
};

export default app;
