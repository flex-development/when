# \:timer\_clock: when

[![github release](https://img.shields.io/github/v/release/flex-development/when.svg?include_prereleases\&sort=semver)](https://github.com/flex-development/when/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/when.svg)](https://npmjs.com/package/@flex-development/when)
[![npm downloads](https://img.shields.io/npm/dm/@flex-development/when.svg)](https://www.npmcharts.com/compare/@flex-development/when?interval=30)
[![install size](https://packagephobia.now.sh/badge?p=@flex-development/when)](https://packagephobia.now.sh/result?p=@flex-development/when)
[![codecov](https://codecov.io/github/flex-development/when/graph/badge.svg?token=BG38l3Clm1)](https://codecov.io/github/flex-development/when)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/when.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits\&logoColor=ffffff)](https://conventionalcommits.org)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript\&logoColor=ffffff)](https://typescriptlang.org)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat\&logo=vitest\&logoColor=ffffff)](https://vitest.dev)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat\&logo=yarn\&logoColor=ffffff)](https://yarnpkg.com)

chain a callback onto a value or promise

## Contents

- [What is this?](#what-is-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
- [Types](#types)
  - [`Awaitable<T>`](#awaitablet)
- [Project](#project)
  - [Version](#version)
  - [Contribute](#contribute)

## What is this?

**TODO**: what is this?

## Install

This package is [ESM only][esm].

In Node.js (version 20+) with [yarn][]:

```sh
yarn add @flex-development/when
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/protocol/git'>Git - Protocols | Yarn</a>
    &nbsp;for details regarding installing from Git.
  </small>
</blockquote>

In Deno with [`esm.sh`][esmsh]:

```ts
import { when } from 'https://esm.sh/@flex-development/when'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import { when } from 'https://esm.sh/@flex-development/when'
</script>
```

## Use

**TODO**: use

## API

`when` exports the identifiers listed below.

The default export is `when`.

**TODO**: api

## Types

This package is fully typed with [TypeScript][].

### `Awaitable<T>`

Create a union of `T` and `T` as a promise-like object (`type`).

```ts
type Awaitable<T> = PromiseLike<T> | T
```

#### Type Parameters

- `T` (`any`)
  — the value

## Project

### Version

when adheres to [semver][].

### Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](./CODE_OF_CONDUCT.md).
By interacting with this repository, organization, or community you agree to abide by its terms.

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[semver]: https://semver.org

[typescript]: https://www.typescriptlang.org

[yarn]: https://yarnpkg.com
