import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Code,
  Copy,
  Check,
  Globe,
  Heart,
  Layers,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { LuGithub as GithubIcon } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/core";
import app from "@/lib/config/app.config";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: createMetaTags({
      title: app.name,
      description: app.description,
    }),
  }),
  component: HomePage,
});

const installCommand =
  "bun add @omnidotdev/rdk @react-three/fiber @react-three/drei three";

const features = [
  {
    icon: Layers,
    title: "Unified XR API",
    description:
      "One consistent API surface for AR, VR, and mixed reality. Write once, target any XR platform.",
    accent: "text-primary",
    accentBg: "bg-primary/10",
  },
  {
    icon: Code,
    title: "React + Three.js Powered",
    description:
      "Build immersive 3D experiences with familiar React patterns and the power of Three.js under the hood.",
    accent: "text-secondary",
    accentBg: "bg-secondary/10",
  },
  {
    icon: Globe,
    title: "Cross-Platform",
    description:
      "Deploy to web, mobile AR, and VR headsets from a single codebase. No platform-specific rewrites.",
    accent: "text-emerald-500",
    accentBg: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Future-Proof",
    description:
      "Built on WebXR, WebGPU, and open standards. Stay ahead as the spatial web evolves.",
    accent: "text-purple-500",
    accentBg: "bg-purple-500/10",
  },
];

/**
 * Home page / Landing.
 */
function HomePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative px-4 pt-20 pb-32 sm:px-6 md:pt-32 md:pb-40 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 font-medium text-primary text-sm">
              An Omni Reality product
            </span>
          </div>

          <h1 className="mb-6 font-extrabold text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-foreground">{app.name}</span>
            <span className="mt-2 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Build XR for the Web
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            {app.description}
          </p>

          {/* Install command */}
          <div className="mx-auto mb-8 max-w-xl">
            <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 font-mono text-sm">
              <span className="text-muted-foreground">$</span>
              <code className="flex-1 truncate text-left text-foreground">
                {installCommand}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy install command"}
              >
                {copied ? (
                  <Check className="size-4 text-primary" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ExternalLink
              href={app.repoUrl}
              size="lg"
              className="group h-12 gap-2 px-8 font-semibold text-base"
            >
              <GithubIcon size={18} />
              View on GitHub
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ExternalLink>

            <ExternalLink
              href="https://github.com/sponsors/omnidotdev"
              variant="outline"
              size="lg"
              className="h-12 gap-2 px-8"
            >
              <Heart className="size-4 text-pink-500" />
              Sponsor
            </ExternalLink>
          </div>
        </div>

        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </section>

      {/* Features */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 font-bold text-3xl text-foreground sm:text-4xl">
              Why RDK?
            </h2>
            <p className="text-lg text-muted-foreground">
              The fastest path from idea to immersive experience
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map(({ icon: Icon, title, description, accent, accentBg }) => (
              <div
                key={title}
                className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:border-primary/30"
              >
                <div
                  className={`mb-4 flex size-12 items-center justify-center rounded-xl ${accentBg} ${accent}`}
                >
                  <Icon className="size-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground text-lg">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source CTA */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-background p-8 sm:p-12 lg:p-16">
            <div className="absolute top-0 right-0 size-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 size-64 rounded-full bg-secondary/5 blur-3xl" />

            <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="mb-4 font-bold text-3xl text-foreground sm:text-4xl">
                  Open source, MIT licensed
                </h2>
                <p className="text-lg text-muted-foreground">
                  RDK is free and open source. Inspect the code, contribute
                  features, or build your own XR toolkit on top. Your
                  experiences, your rules.
                </p>
              </div>

              <ExternalLink
                href={app.repoUrl}
                variant="outline"
                size="lg"
                className="h-12 gap-2 px-6"
              >
                <GithubIcon size={20} />
                View on GitHub
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="size-[400px] rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="relative">
            <h2 className="mb-6 font-bold text-4xl text-foreground sm:text-5xl">
              Ready to build{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                immersive experiences?
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
              Get started with RDK in minutes. One install, familiar React
              patterns, infinite possibilities.
            </p>

            <ExternalLink
              href={app.docsUrl}
              size="lg"
              className="group h-14 gap-2 px-10 font-semibold text-lg"
            >
              Get Started
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </ExternalLink>
          </div>
        </div>
      </section>
    </div>
  );
}
