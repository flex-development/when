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

like `.then`, but for values *and* thenables.

## Contents

- [What is this?](#what-is-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`isPromiseLike<T>(value)`][ispromiselike]
  - [`when<[T][, Next][, Args][, Self]>(value, chain[, reject][, context][, ...args])`][when]
- [Types](#types)
  - [`Awaitable<T>`][awaitable]
  - [`Chain<[T][, Next][, Args][, Self]>`][chain]
  - [`Options<[T][, Next][, Args][, Self]>`][options]
  - [`Reject<[Next][, Fail][, Self]>`][reject]
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

The default export is [`when`][when].

### `isPromiseLike<T>(value)`

Check if `value` looks like a promise.

#### Type Parameters

- `T` (`any`)
  — the resolved value

#### Parameters

- `value` (`unknown`)
  — the thing to check

#### Returns

(`value is PromiseLike<T>`) `true` if `value` is `PromiseLike` object, `false` otherwise

<!--lint disable-->

### `when<[T][, Next][, Args][, Self]>(value, chain[, reject][, context][, ...args])`

<!--lint enable-->

Chain a callback, calling the function after `value` is resolved, or immediately if `value` is not a promise.

#### Overloads

```ts
function when<
  T,
  Next = any,
  Args extends any[] = any[],
  Self = unknown
>(
  this: void,
  value: Awaitable<T>,
  chain: Chain<T, Next, Args, Self>,
  reject?: Reject<Next, any, Self> | null | undefined,
  context?: Self | null | undefined,
  ...args: Args
): Awaitable<Next>
```

```ts
function when<
  T,
  Next = any,
  Args extends any[] = any[],
  Self = unknown
>(
  this: void,
  value: Awaitable<T>,
  chain: Options<T, Next, Args, Self>
): Awaitable<Next>
```

#### Type Parameters

- `T` (`any`)
  — the previously resolved value
- `Next` (`any`, optional)
  — the next resolved value
  - **default**: `any`
- `Args` (`readonly any[]`, optional)
  — the function arguments
  - **default**: `any[]`
- `Self` (`any`, optional)
  — the `this` context
  - **default**: `unknown`

#### Parameters

- `value` ([`Awaitable<T>`][awaitable])
  — the promise or the resolved value
- `chain` ([`Chain<T, Next, Args, Self>`][chain] | [`Options<T, Next, Args, Self>`][options])
  — the chain callback or options for chaining
- `reject` ([`Reject<Next, any, Self>`][reject] | `null` | `undefined`)
  — the callback to fire when a promise is rejected or an error is thrown
- `context` (`Self` | `null` | `undefined`)
  — the `this` context of the chain and error callbacks
- `...args` (`Args`)
  — the arguments to pass to the chain callback

#### Returns

([`Awaitable<Next>`][awaitable]) The next promise or value

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

### `Chain<[T][, Next][, Args][, Self]>`

A chain callback (`type`).

```ts
type Chain<
  T = any,
  Next = any,
  Args extends readonly any[] = any[],
  Self = unknown
> = (this: Self, ...params: [...Args, T]) => Awaitable<Next>
```

#### Type Parameters

- `T` (`any`, optional)
  — the previously resolved value
  - **default**: `any`
- `Next` (`any`, optional)
  — the next resolved value
  - **default**: `any`
- `Args` (`readonly any[]`, optional)
  — the function arguments
  - **default**: `any[]`
- `Self` (`any`, optional)
  — the `this` context
  - **default**: `unknown`

#### Parameters

- **`this`** (`Self`)
- `...params` (`[...Args, T]`)
  — the function parameters, with the last being the previously resolved value.
  in cases where a promise is not being resolved, this is the same `value` passed to `when`

#### Returns

([`Awaitable<Next>`][awaitable]) The next promise or value

### `Options<[T][, Next][, Args][, Self]>`

Options for chaining (`interface`).

```ts
interface Options<
  T = any,
  Next = any,
  Args extends readonly any[] = any[],
  Self = any
> { /* ... */ }
```

#### Type Parameters

- `T` (`any`, optional)
  — the previously resolved value
  - **default**: `any`
- `Next` (`any`, optional)
  — the next resolved value
  - **default**: `any`
- `Args` (`readonly any[]`, optional)
  — the chain function arguments
  - **default**: `any[]`
- `Self` (`any`, optional)
  — the `this` context
  - **default**: `any`

#### Properties

- `args?` (`Args` | `null` | `undefined`)
  — the arguments to pass to the `chain` callback
- `chain` ([`Chain<T, Next, Args, Self>`][chain])
  — the chain callback
- `context?` (`Self` | `null` | `undefined`)
  — the `this` context of the `chain` and `reject` callbacks
- `reject?` ([`Reject<Next, any, Self>`][reject] | `null` | `undefined`)
  — the callback to fire when a promise is rejected or an error is thrown

### `Reject<[Next][, Fail][, Self]>`

The callback to fire when a promise is rejected or an error is thrown from a synchronous function (`type`).

```ts
type Reject<
  Next = any,
  Fail = any,
  Self = unknown
> = (this: Self, e: Fail) => Awaitable<Next>
```

#### Type Parameters

- `Next` (`any`, optional)
  — the next resolved value
  - **default**: `any`
- `Fail` (`any`, optional)
  — the error to handle
  - **default**: `any`
- `Self` (`any`, optional)
  — the `this` context
  - **default**: `unknown`

#### Parameters

- **`this`** (`Self`)
- `e` (`Fail`)
  — the error

#### Returns

([`Awaitable<Next>`][awaitable]) The next promise or value

## Project

### Version

when adheres to [semver][].

### Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](./CODE_OF_CONDUCT.md).
By interacting with this repository, organization, or community you agree to abide by its terms.

[awaitable]: #awaitablet

[chain]: #chaint-next-args-self

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[ispromiselike]: #ispromiseliketvalue

[options]: #optionst-next-args-self

[reject]: #rejectnext-fail-self

[semver]: https://semver.org

[typescript]: https://www.typescriptlang.org

[when]: #whent-next-args-selfvalue-chain-reject-context-args

[yarn]: https://yarnpkg.com
