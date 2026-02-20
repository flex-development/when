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

like `.then`, but for synchronous values *and* thenables.

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
  - [Why not `Promise.resolve`?](#why-not-promiseresolve)
  - [Design guarantees](#design-guarantees)
- [Install](#install)
- [Use](#use)
  - [Chain a synchronous value](#chain-a-synchronous-value)
  - [Chain a *thenable*](#chain-a-thenable)
  - [Pass arguments to the chain callback](#pass-arguments-to-the-chain-callback)
  - [Handle failures](#handle-failures)
  - [Bind `this` context](#bind-this-context)
  - [Use an options object](#use-an-options-object)
- [API](#api)
  - [`isPromise<T>(value)`][ispromise]
  - [`isThenable<T>(value)`][isthenable]
  - [`when<T[, Next][, Failure][, Args][, Error][, This]>(value, chain[, reject][, context][, ...args])`][when]
- [Types](#types)
  - [`Awaitable<T>`][awaitable]
  - [`Chain<[T][, Next][, Args][, This]>`][chain]
  - [`Fail<[Next][, Error][, This]>`][fail]
  - [`Options<[T][, Next][, Failure][, Args][, Error][, This]>`][options]
- [Glossary](#glossary)
- [Project](#project)
  - [Version](#version)
  - [Contribute](#contribute)
  - [Sponsor](#sponsor)

## What is this?

`when` is a tiny primitive for chaining callbacks
onto [awaitables][awaitable] (synchronous or [*thenable*][thenable] values).

For thenable values, `then` is used to invoke the callback after resolution. Otherwise, the callback fires immediately.
This makes it easy to write one code path that supports both synchronous values and promises.

## When should I use this?

`when` is especially useful in libraries implementing awaitable APIs.

It provides [`Promise.then`][promise-then] semantics without forcing [`Promise.resolve`][promise-resolve],
preserving synchronous execution whenever possible.

Typical use cases include plugin systems, hook pipelines, module resolvers, data loaders, and file system adapters where
users may return both synchronous or asynchronous values.

If you're only dealing with promises and thenables, consider using native `async/await` or `Promise` chaining instead.

### Why not [`Promise.resolve`][promise-resolve]?

`when` preserves synchronous operations whenever possible,
avoiding unnecessary promise allocation and microtask scheduling.

```ts
Promise.resolve(value).then(fn) // always a promise
```

```ts
when(value, fn) // only a promise if `value` is a thenable, or `fn` returns one
```

### Design guarantees

- Synchronous values remain synchronous
- [*Thenable*s][thenable] are chained without wrapping in [`Promise.resolve`][promise-resolve]
- No additional microtasks are scheduled for non-thenables
- Failures propagate unless a `fail` handler is provided
- Returned thenables are preserved without additional wrapping

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

### Chain a synchronous value

```ts
import { isThenable, when, type Awaitable } from '@flex-development/when'
import { ok } from 'devlop'

/**
 * The result.
 *
 * @const {Awaitable<number>} result
 */
const result: Awaitable<number> = when(0, n => n + 1)

ok(!isThenable(result), 'expected `result` to not be thenable')
console.dir(result) // 1
```

### Chain a [*thenable*][thenable]

```ts
import { isThenable, when, type Awaitable } from '@flex-development/when'
import { ok } from 'devlop'

/**
 * The result.
 *
 * @const {Awaitable<number>} result
 */
const result: Awaitable<number> = when(Promise.resolve(2), n => n + 1)

ok(isThenable(result), 'expected `result` to be thenable')
console.dir(await result) // 3
```

### Pass arguments to the chain callback

When arguments are provided, they are passed to the `chain` callback first, followed by the resolved value.

When the `value` passed to `when` is not [*thenable*][thenable], the resolved value is the same `value`.

```ts
import when, { type Awaitable } from '@flex-development/when'

/**
 * The result.
 *
 * @const {Awaitable<number>} result
 */
const result: Awaitable<number> = when(
  1, // last argument passed to `Math.min`
  Math.min, // `chain`
  null, // `fail`
  undefined, // `context`
  2, // first argument passed to `Math.min`
  3, // second argument passed to `Math.min`
  4 // third argument passed to `Math.min`
)

console.dir(result) // 1
```

### Handle failures

For [*thenable*s][thenable], the `fail` callback is passed to `then` as the `onrejected` parameter,
and if implemented, to `catch` as well to prevent unhandled rejections.

```ts
import when, { type Awaitable } from '@flex-development/when'

/**
 * The thenable value.
 *
 * @const {PromiseLike<never>} value
 */
const value: PromiseLike<never> = new Promise((resolve, reject) => {
  return void reject(new Error('nope', { cause: { url: import.meta.url } }))
})

/**
 * The result.
 *
 * @const {Awaitable<boolean>} result
 */
const result: Awaitable<boolean> = when(value, chain, fail)

console.dir(await result) // false

/**
 * @this {void}
 *
 * @return {true}
 *  The success result
 */
function chain(this: void): true {
  return true
}

/**
 * @this {void}
 *
 * @param {Error} e
 *  The error to handle
 * @return {false}
 *  The failure result
 */
function fail(this: void, e: Error): false {
  return console.dir(e), false
}
```

### Bind `this` context

```ts
import when, { type Awaitable } from '@flex-development/when'

/**
 * The `this` context.
 */
type Context = { prefix: string }

/**
 * The result.
 *
 * @const {Awaitable<string>} result
 */
const result: Awaitable<string> = when(13, id, null, { prefix: 'id:' })

console.log(result) // 'id:13'

/**
 * @this {Context}
 *
 * @param {number | string} num
 *  The id number
 * @return {string}
 *  The id string
 */
function id(this: Context, num: number | string): string {
  return this.prefix + num
}
```

### Use an options object

```ts
import when, { type Awaitable } from '@flex-development/when'

/**
 * The `this` context.
 */
type Context = { errors: Error[] }

/**
 * The thenable value.
 *
 * @const {Promise<number>} value
 */
const value: Promise<number> = new Promise(resolve => resolve(3))

/**
 * The result.
 *
 * @const {Awaitable<number | undefined>} result
 */
const result: Awaitable<number | undefined> = when(value, {
  args: [39],
  chain: divide,
  context: { errors: [] },
  fail
})

console.dir(await result) // 13

/**
 * @this {void}
 *
 * @param {number} dividend
 *  The number to divide
 * @param {number} divisor
 *  The number to divide by
 * @return {number}
 *  The quotient
 */
function divide(this: void, dividend: number, divisor: number): number {
  return dividend / divisor
}

/**
 * @this {Context}
 *
 * @param {Error} e
 *  The error to handle
 * @return {undefined}
 */
function fail(this: Context, e: Error): undefined {
  return void this.errors.push(e)
}
```

## API

`when` exports the identifiers listed below.

The default export is [`when`][when].

### `isPromise<T>(value)`

Check if `value` looks like a `Promise`.

> 👉 **Note**: This function intentionally performs a structural check instead of a brand check.
> It does not rely on `instanceof Promise` or constructors, making it compatible with cross-realm promises
> and custom thenables.

#### Type Parameters

- `T` (`any`)
  — the resolved value

#### Parameters

- `value` (`unknown`)
  — the thing to check

#### Returns

(`value is Promise<T>`) `true` if `value` is a [*thenable*][thenable] with a `catch` method, `false` otherwise

### `isThenable<T>(value)`

Check if `value` looks like a [*thenable*][thenable], i.e. a `PromiseLike` object.

> 👉 **Note**: Also exported as `isPromiseLike`.

#### Type Parameters

- `T` (`any`)
  — the resolved value

#### Parameters

- `value` (`unknown`)
  — the thing to check

#### Returns

(`value is PromiseLike<T>`) `true` if `value` is an object or function with a `then` method, `false` otherwise

<!--lint disable-->

### `when<T[, Next][, Failure][, Args][, Error][, This]>(value, chain[, fail][, context][, ...args])`

<!--lint enable-->

Chain a callback, calling the function after `value` is resolved,
or immediately if `value` is not a [*thenable*][thenable].

#### Overloads

```ts
function when<
  T,
  Next = any,
  Args extends any[] = any[],
  This = unknown
>(
  this: void,
  value: Awaitable<T>,
  chain: Chain<T, Next, Args, This>,
  fail?: null | undefined,
  context?: This | null | undefined,
  ...args: Args
): Awaitable<Next>
```

```ts
function when<
  T,
  Next = any,
  Failure = Next,
  Args extends any[] = any[],
  Error = any,
  This = unknown
>(
  this: void,
  value: Awaitable<T>,
  chain: Chain<T, Next, Args, This>,
  fail?: Fail<Failure, Error, This> | null | undefined,
  context?: This | null | undefined,
  ...args: Args
): Awaitable<Failure | Next>
```

```ts
function when<
  T,
  Next = any,
  Failure = Next,
  Args extends any[] = any[],
  Error = any,
  This = unknown
>(
  this: void,
  value: Awaitable<T>,
  chain: Options<T, Next, Failure, Args, Error, This>
): Awaitable<Failure | Next>
```

#### Type Parameters

- `T` (`any`)
  — the previously resolved value
- `Next` (`any`, optional)
  — the next resolved value
  - **default**: `any`
- `Failure` (`any`, optional)
  — the next resolved value on failure
  - **default**: `Next`
- `Args` (`readonly any[]`, optional)
  — the chain function arguments
  - **default**: `any[]`
- `Error` (`any`, optional)
  — the error to possibly handle
  - **default**: `any`
- `This` (`any`, optional)
  — the `this` context
  - **default**: `unknown`

#### Parameters

- `value` ([`Awaitable<T>`][awaitable])
  — the current [*awaitable*][awaitable-term]
- `chain` ([`Chain<T, Next, Args, This>`][chain] | [`Options<T, Next, Failure, Args, Error, This>`][options])
  — the chain callback or options for chaining
- `fail` ([`Fail<Failure, Error, This>`][fail] | `null` | `undefined`)
  — the callback to fire when a failure occurs. failures include:
  - rejections of the input [*thenable*][thenable]
  - rejections returned from `chain`
  - synchronous errors thrown in `chain`\
    if no `fail` handler is provided, failures are re-thrown or re-propagated.
  > 👉 **note**: for thenables, this callback is passed to `then` as the `onrejected` parameter,
  > and if implemented, to `catch` as well to prevent unhandled rejections.
- `context` (`This` | `null` | `undefined`)
  — the `this` context of the chain and `fail` callbacks
- `...args` (`Args`)
  — the arguments to pass to the chain callback

#### Returns

([`Awaitable<Failure | Next>`][awaitable] | [`Awaitable<Next>`][awaitable]) The next [*awaitable*][awaitable-term]

## Types

This package is fully typed with [TypeScript][].

### `Awaitable<T>`

A synchronous or [*thenable*][thenable] value (`type`).

```ts
type Awaitable<T> = PromiseLike<T> | T
```

#### Type Parameters

- `T` (`any`)
  — the resolved value

### `Chain<[T][, Next][, Args][, This]>`

A chain callback (`type`).

```ts
type Chain<
  T = any,
  Next = any,
  Args extends readonly any[] = any[],
  This = unknown
> = (this: This, ...params: [...Args, T]) => Awaitable<Next>
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
- `This` (`any`, optional)
  — the `this` context
  - **default**: `unknown`

#### Parameters

- **`this`** (`This`)
- `...params` (`[...Args, T]`)
  — the function parameters, with the last being the previously resolved value.
  in cases where a promise is not being resolved, this is the same `value` passed to `when`

#### Returns

([`Awaitable<Next>`][awaitable]) The next [*awaitable*][awaitable-term]

### `Fail<[Next][, Error][, This]>`

The callback to fire when a failure occurs (`type`).

```ts
type Fail<
  Next = any,
  Error = any,
  This = unknown
> = (this: This, e: Error) => Awaitable<Next>
```

#### Type Parameters

- `Next` (`any`, optional)
  — the next resolved value
  - **default**: `any`
- `Error` (`any`, optional)
  — the error to handle
  - **default**: `any`
- `This` (`any`, optional)
  — the `this` context
  - **default**: `unknown`

#### Parameters

- **`this`** (`This`)
- `e` (`Error`)
  — the error

#### Returns

([`Awaitable<Next>`][awaitable]) The next [*awaitable*][awaitable-term]

### `Options<[T][, Next][, Failure][, Args][, Error][, This]>`

Options for chaining (`interface`).

```ts
interface Options<
  T = any,
  Next = any,
  Failure = Next,
  Args extends readonly any[] = any[],
  Error = any,
  This = any
> { /* ... */ }
```

#### Type Parameters

- `T` (`any`, optional)
  — the previously resolved value
  - **default**: `any`
- `Next` (`any`, optional)
  — the next resolved value
  - **default**: `any`
- `Failure` (`any`, optional)
  — the next resolved value on failure
  - **default**: `Next`
- `Args` (`readonly any[]`, optional)
  — the chain function arguments
  - **default**: `any[]`
- `Error` (`any`, optional)
  — the error to possibly handle
  - **default**: `any`
- `This` (`any`, optional)
  — the `this` context
  - **default**: `any`

#### Properties

- `args?` (`Args` | `null` | `undefined`)
  — the arguments to pass to the `chain` callback
- `chain` ([`Chain<T, Next, Args, This>`][chain])
  — the chain callback
- `context?` (`This` | `null` | `undefined`)
  — the `this` context of the `chain` and `fail` callbacks
- `fail?` ([`Fail<Next, Error, This>`][fail] | `null` | `undefined`)
  — the callback to fire when a failure occurs. failures include:
  - rejections of the input [*thenable*][thenable]
  - rejections returned from `chain`
  - synchronous errors thrown in `chain`\
    if no `fail` handler is provided, failures are re-thrown or re-propagated.
  > 👉 **note**: for thenables, this callback is passed to `then` as the `onrejected` parameter,
  > and if implemented, to `catch` as well to prevent unhandled rejections.

## Glossary

### *awaitable*

A synchronous or [*thenable*][thenable] value.

### *thenable*

An object or function with a `then` method.

JavaScript engines use duck-typing for promises.
Arrays, functions, and objects with a `then` method will be treated as promise-like objects, and work with built-in
mechanisms like [`Promise.resolve`][promise-resolve] and the [`await` keyword][await] like native promises.

Some thenables also implement a `catch` method (like native promises).
When available, `when` uses it to ensure rejections are handled.

## Project

### Version

when adheres to [semver][].

### Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](./CODE_OF_CONDUCT.md).
By interacting with this repository, organization, or community you agree to abide by its terms.

### Sponsor

This package is intentionally small — and intentionally maintained.

Small primitives power larger systems.
Support long-term stability by sponsoring Flex Development.

[await]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/await

[awaitable-term]: #awaitable

[awaitable]: #awaitablet

[chain]: #chaint-next-args-this

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[fail]: #failnext-error-this

[ispromise]: #ispromisetvalue

[isthenable]: #isthenabletvalue

[options]: #optionst-next-failure-args-error-this

[promise-resolve]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve

[promise-then]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

[semver]: https://semver.org

[thenable]: #thenable

[typescript]: https://www.typescriptlang.org

[when]: #whent-next-failure-args-error-thisvalue-chain-fail-context-args

[yarn]: https://yarnpkg.com
