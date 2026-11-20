import { Button } from "@omnidotdev/thornberry/button";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Camera,
  Check,
  Copy,
  Glasses,
  Hand,
  MapPin,
  QrCode,
} from "lucide-react";
import { Suspense, lazy, useState } from "react";
import { LuGithub as GithubIcon } from "react-icons/lu";

import { ExternalLink } from "@/components/core";
import app from "@/lib/config/app.config";
import createMetaTags from "@/lib/util/createMetaTags";

const HeroScene = lazy(() => import("@/components/landing/HeroScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: createMetaTags(),
  }),
  component: HomePage,
});

const installCommand = "bun add @omnidotdev/rdk @react-three/fiber react three";

const codeSample = `import { XR } from "@omnidotdev/rdk/engine";
import {
  GeolocationAnchor,
  GeolocationSession,
} from "@omnidotdev/rdk/geolocation";
import { Canvas } from "@react-three/fiber";

export default function App() {
  return (
    <Canvas>
      <XR>
        <GeolocationSession>
          <GeolocationAnchor latitude={51.05} longitude={-0.72}>
            <mesh>
              <boxGeometry args={[10, 10, 10]} />
              <meshBasicMaterial color="cyan" />
            </mesh>
          </GeolocationAnchor>
        </GeolocationSession>
      </XR>
    </Canvas>
  );
}`;

const modes = [
  {
    n: "01",
    icon: QrCode,
    title: "Marker AR",
    backend: "AR.js",
    desc: "Anchor 3D content to printed fiducial markers. Reliable, and works with no WebXR.",
  },
  {
    n: "02",
    icon: MapPin,
    title: "Geolocation AR",
    backend: "LocAR.js",
    desc: "Place world anchors by GPS and compass heading, at outdoor map scale.",
  },
  {
    n: "03",
    icon: Camera,
    title: "Magic Window",
    backend: "DeviceOrientation",
    desc: "Camera passthrough driven by device orientation. Works on any phone.",
  },
  {
    n: "04",
    icon: Glasses,
    title: "WebXR AR / VR",
    backend: "@react-three/xr",
    desc: "Immersive headset and handset sessions through the WebXR spec.",
  },
  {
    n: "05",
    icon: Hand,
    title: "Vision Tracking",
    backend: "MediaPipe / ONNX",
    desc: "Track hands, faces, and bodies, and detect objects, straight from the camera feed.",
  },
];

const ecosystem = [
  "Three.js",
  "react-three-fiber",
  "AR.js",
  "LocAR",
  "WebXR",
  "MediaPipe",
  "ONNX Runtime",
  "WebGPU",
];

const gridBackground =
  "linear-gradient(to right, color-mix(in oklch, var(--color-primary) 14%, transparent) 1px, transparent 1px)," +
  "linear-gradient(to bottom, color-mix(in oklch, var(--color-primary) 14%, transparent) 1px, transparent 1px)";

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
      {/* marquee animation */}
      <style>
        {
          "@keyframes rdk-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"
        }
      </style>

      {/* AR-style coordinate grid, faded toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          backgroundImage: gridBackground,
          backgroundSize: "46px 46px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 85%)",
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
        {/* legibility wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 38% 46%, color-mix(in oklch, var(--color-background) 60%, transparent) 0%, transparent 72%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-24 md:pt-40 md:pb-32 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display font-extrabold text-5xl leading-none tracking-tight sm:text-6xl md:text-7xl">
              The React framework
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text pb-2 text-transparent leading-none">
                for web XR.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg text-muted-foreground">
              One React API over marker AR, geolocation AR, camera passthrough,
              WebXR, and vision tracking, powered by{" "}
              <span className="text-foreground">Three.js</span> and{" "}
              <span className="text-foreground">react-three-fiber</span>. Target
              browsers, phones, and headsets from a single codebase.
            </p>

            {/* Install */}
            <div className="mt-9 flex max-w-md items-center gap-2 rounded-lg border bg-card/70 px-4 py-3 font-mono text-sm backdrop-blur">
              <span className="text-primary">$</span>
              <code className="flex-1 truncate text-foreground">
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

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ExternalLink
                href={app.tutorialUrl}
                size="lg"
                className="group h-12 gap-2 px-8 font-semibold text-base"
              >
                Start the tutorial
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </ExternalLink>
              <ExternalLink
                href={app.repoUrl}
                variant="outline"
                size="lg"
                className="h-12 gap-2 px-8"
              >
                <GithubIcon size={18} />
                View on GitHub
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem marquee */}
      <section className="overflow-hidden border-y bg-card/40 py-4 backdrop-blur">
        <div
          className="flex w-max items-center gap-12 whitespace-nowrap font-mono text-muted-foreground text-sm"
          style={{ animation: "rdk-marquee 34s linear infinite" }}
        >
          {[...ecosystem, ...ecosystem, ...ecosystem].map((item, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static repeated marquee
              key={i}
              className="flex items-center gap-12"
            >
              <span className="text-primary">◆</span>
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Modes */}
      <section className="mx-auto max-w-6xl px-6 py-28 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-bold font-display text-4xl tracking-tight sm:text-5xl">
            Every reality,
            <br />
            one API.
          </h2>
          <p className="max-w-sm text-muted-foreground">
            RDK collapses the fragmented AR and VR landscape into a single React
            abstraction. Same mental model, every surface.
          </p>
        </div>

        <div className="border-t">
          {modes.map(({ n, icon: Icon, title, backend, desc }) => (
            <div
              key={title}
              className="group -mx-4 grid grid-cols-[3rem_1fr] items-start gap-x-5 gap-y-2 rounded-lg border-b px-4 py-7 transition-colors hover:bg-primary/5 md:grid-cols-[4rem_1fr_12rem] md:items-center"
            >
              <span className="font-mono text-2xl text-primary/40 transition-colors group-hover:text-primary">
                {n}
              </span>
              <div>
                <div className="flex items-center gap-3">
                  <Icon className="size-5 text-primary" />
                  <h3 className="font-display font-semibold text-2xl">
                    {title}
                  </h3>
                </div>
                <p className="mt-2 text-muted-foreground">{desc}</p>
              </div>
              <span className="col-start-2 font-mono text-muted-foreground text-sm md:col-start-3 md:text-right">
                {backend}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Code */}
      <section className="mx-auto max-w-6xl px-6 pb-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-bold font-display text-4xl tracking-tight sm:text-5xl">
              If you know React,
              <br />
              you know RDK.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Every mode is the same shape: an{" "}
              <code className="text-foreground">XR</code> session, an anchor,
              and your own React Three Fiber content inside. Swap the session
              and you swap realities: markers, GPS, passthrough, WebXR, or
              vision tracking. The rest is unchanged.
            </p>
            <ExternalLink
              href={app.tutorialUrl}
              size="lg"
              className="group mt-8 h-12 gap-2 px-8 font-semibold text-base"
            >
              See it in the tutorial
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ExternalLink>
          </div>

          <div className="relative min-w-0">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-60 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl">
              <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
                <span className="size-3 rounded-full bg-red-400/70" />
                <span className="size-3 rounded-full bg-yellow-400/70" />
                <span className="size-3 rounded-full bg-green-400/70" />
                <span className="ml-2 font-mono text-muted-foreground text-xs">
                  App.tsx
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
                <code className="text-foreground">{codeSample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 50% 100%, color-mix(in oklch, var(--color-primary) 16%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-32 text-center">
          <div className="mb-6 font-display text-7xl text-primary/25">
            {app.icon}
          </div>
          <h2 className="font-bold font-display text-4xl tracking-tight sm:text-5xl">
            Ship your first AR scene today.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
            Install, drop an anchor, and see it in the real world. Familiar
            React patterns, no platform-specific rewrites.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ExternalLink
              href={app.tutorialUrl}
              size="lg"
              className="group h-13 gap-2 px-9 font-semibold text-base"
            >
              Start the tutorial
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ExternalLink>
            <ExternalLink
              href={app.docsUrl}
              variant="outline"
              size="lg"
              className="h-13 gap-2 px-8"
            >
              Read the docs
            </ExternalLink>
          </div>
        </div>
      </section>
    </div>
  );
}
