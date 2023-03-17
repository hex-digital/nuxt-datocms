# Nuxt DatoCMS

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt 3 module for [DatoCMS](https://datocms.com/), a wonderful Headless CMS.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/hex-digital/nuxt-datocms?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- ⛰ Integration with Nuxt's `useAsyncData()` for de-duplicated requests
- 🌲 Pre-configured preview mode for draft content, and real-time updates
- 🧭 Easily generate a sitemap for your DatoCMS-powered site (coming soon)

## Usage

_Note: This module is for Nuxt 3. We do not provide a Nuxt 2 version._

> If you are a first-time DatoCMS user, read the [Nuxt DatoCMS](https://www.datocms.com/cms/nuxtjs-cms) page 
> to get a project ready in less than 5 minutes.

### Installation

1. Add `@hexdigital/nuxt-datocms` dependency to your project

```bash
pnpm add -D @hexdigital/nuxt-datocms
# yarn add --dev @hexdigital/nuxt-datocms
# npm install --save-dev @hexdigital/nuxt-datocms
```

2. Add `@hexdigital/nuxt-datocms` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@hexdigital/nuxt-datocms'
  ]
})
```

That's it! You can now use Nuxt DatoCMS in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@hexdigital/nuxt-datocms/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@hexdigital/nuxt-datocms

[npm-downloads-src]: https://img.shields.io/npm/dm/@hexdigital/nuxt-datocms.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@hexdigital/nuxt-datocms

[license-src]: https://img.shields.io/npm/l/@hexdigital/nuxt-datocms.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@hexdigital/nuxt-datocms

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
