# Sparkling App Demo

A **greenfield Lynx.js app** built with [Sparkling](https://tiktok.github.io/sparkling/) — the application layer for [Lynx](https://lynxjs.org/) that provides native navigation, CLI tooling, and a typed bridge to native code.

This repository is the **companion code** for the article:

**[Sparkling: The Missing App Layer for Lynx.js](https://www.callstack.com/blog/sparkling-the-missing-app-layer-for-lynx-js)**  
_Callstack · February 2026_

The article walks through bootstrapping a Sparkling project, understanding its structure, navigation with `sparkling-navigation`, adding pages, wiring Lynx DevTool, and the current state of the developer experience. This repo contains the resulting demo app with three pages and the changes described in the article.

---

## What’s in this demo

- **Multi-page app** — Main, Second, and Third screens, each in its own native container (scheme-based navigation).
- **Navigation examples** — Using both `router.open({ scheme })` (full URL) and `router.navigate({ path, options })` with params/extra.
- **Lynx DevTool** — Integrated on Android for debugging and inspecting `lynx.__globalProps` (see `SparklingApplication.kt` and `app/build.gradle.kts`).
- **Project layout** — Typical Sparkling structure: `app.config.ts` (router + Lynx config), `src/pages/`, `android/`, `ios/`, and `.sparkling/lynx.config.ts` for the Rspeedy dev server.

---

## Prerequisites

- **Node.js** 22 or 24
- **Android:** Android Studio, SDK, JDK 11+
- **iOS:** Xcode 16+, Ruby ≥ 2.7 and &lt; 3.4, CocoaPods

---

## Getting started

```bash
# Install dependencies
npm install

# Run on Android
npm run run:android

# Run on iOS (copies bundle into app)
npm run run:ios
```

**Build and copy assets**

```bash
npm run build
```

Then run the app as above. The native shells load the bundles from `dist/` (or from copied assets when using `--copy`).

---

## Project structure

| Area                        | Purpose                                                         |
| --------------------------- | --------------------------------------------------------------- |
| `src/`                      | Lynx app: `pages/` (main, second, third), `assets/`             |
| `resource/`                 | App icon, splash assets (see `resource/README.md`)              |
| `app.config.ts`             | Sparkling app config: `lynxConfig`, `router`, `paths`, `plugin` |
| `android/`, `ios/`          | Native projects; open in Android Studio / Xcode                 |
| `.sparkling/lynx.config.ts` | Rspeedy-compatible config for `npx rspeedy dev`                 |

**Router** in `app.config.ts`: each key (`main`, `second`, `third`) maps to a route; `lynxConfig.source.entry` defines the bundle entries. Route names and entry names must match.

---

## Scripts

| Script                | Description                                           |
| --------------------- | ----------------------------------------------------- |
| `npm run build`       | Build Lynx bundles (`sparkling-app-cli build --copy`) |
| `npm run run:android` | Run on Android                                        |
| `npm run run:ios`     | Run on iOS (with `--copy`)                            |
| `npm run autolink`    | Register native modules                               |
| `npm run test`        | Run tests                                             |

---

## Dev server (Rspeedy)

The template does not start a JS dev server by default. To run Rspeedy with this project’s config:

```bash
npx rspeedy dev --config .sparkling/lynx.config.ts
```

`.sparkling/lynx.config.ts` re-exports the Lynx config from `app.config.ts` so Rspeedy can load it. At the time of the article, the generated native shells did not automatically connect to this dev server; the workflow was build → copy → run. See the [article](https://www.callstack.com/blog/sparkling-the-missing-app-layer-for-lynx-js) for context and updates.

---

## Links

- **Article (companion to this repo):** [Sparkling: The Missing App Layer for Lynx.js](https://www.callstack.com/blog/sparkling-the-missing-app-layer-for-lynx-js)
- **Sparkling:** [tiktok.github.io/sparkling](https://tiktok.github.io/sparkling/)
- **Lynx:** [lynxjs.org/](https://lynxjs.org/)
- **Livestream:** [Sparkling: A New Framework for Lynx](https://www.callstack.com/events/sparkling-a-new-framework-for-lynx) (Callstack × Lynx team)
