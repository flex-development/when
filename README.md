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
  - [Integrate with `@typescript-eslint`](#integrate-with-typescript-eslint)
- [API](#api)
  - [`isCatchable<T>(value)`][iscatchable]
  - [`isFinalizable<T>(value)`][isfinalizable]
  - [`isPromise<T>(value[, finalizable])`][ispromise]
  - [`isPromiseLike<T>(value)`][ispromiselike]
  - [`isThenable<T>(value)`][isthenable]
  <!--lint disable-->
  - [`when<T[, Next][, Failure][, Args][, Error][, This][, Result]>(value, chain[, fail][, context][, ...args])`][when]
  <!--lint enable-->
- [Types](#types)
  - [`Awaitable<T>`][awaitable]
  - [`Catch<[T][, Reason]>`][catch]
  - [`Catchable<[T]>`][catchable]
  - [`Chain<[T][, Next][, Args][, This]>`][chain]
  - [`Fail<[Next][, Error][, This]>`][fail]
  - [`Finalizable<[T]>`][finalizable]
  - [`Finally<[T]>`][finally]
  - [`OnFinally`][onfinally]
  - [`OnFulfilled<T[, Next]>`][onfulfilled]
  - [`OnRejected<Next[, Reason]>`][onrejected]
  - [`Options<[T][, Next][, Failure][, Args][, Error][, This]>`][options]
  - [`PromiseLike<T>`][promiselike]
  - [`Then<[T][, Reason]>`][then]
  - [`Thenable<[T]>`][thenable]
- [Glossary](#glossary)
- [Project](#project)
  - [Version](#version)
  - [Contribute](#contribute)
  - [Sponsor](#sponsor)

## What is this?

`when` is a tiny primitive for chaining callbacks
onto [awaitables][awaitable] (synchronous or [*thenable*][thenable-term] values).

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
- [*Thenable*s][thenable-term] are chained without wrapping in [`Promise.resolve`][promise-resolve]
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
import { isThenable, when } from '@flex-development/when'
import { ok } from 'devlop'

/**
 * The result.
 *
 * @const {number} result
 */
const result: number = when(0, n => n + 1)

ok(!isThenable(result), 'expected `result` to not be thenable')
console.dir(result) // 1
```

### Chain a [*thenable*][thenable-term]

```ts
import { isPromise, when } from '@flex-development/when'
import { ok } from 'devlop'

/**
 * The result.
 *
 * @const {Promise<number>} result
 */
const result: Promise<number> = when(Promise.resolve(2), n => n + 1)

ok(isPromise(result), 'expected `result` to be a promise')
console.dir(await result) // 3
```

### Pass arguments to the chain callback

When arguments are provided, they are passed to the `chain` callback first, followed by the resolved value.

When the `value` passed to `when` is not a [*thenable*][thenable-term], the resolved value is the same `value`.

```ts
import when from '@flex-development/when'

/**
 * The result.
 *
 * @const {number} result
 */
const result: number = when(
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

For [*thenable*s][thenable-term], the `fail` callback is passed to `then` as the `onrejected` parameter,
and if implemented, to `catch` as well to prevent unhandled rejections.

```ts
import when from '@flex-development/when'

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
 * @const {Promise<boolean>} result
 */
const result: Promise<boolean> = when(value, chain, fail)

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
import when from '@flex-development/when'

/**
 * The `this` context.
 */
type Context = { prefix: string }

/**
 * The result.
 *
 * @const {string} result
 */
const result: string = when(13, id, null, { prefix: 'id:' })

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
 * @const {Promise<number | undefined>} result
 */
const result: Promise<number | undefined> = when(value, {
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

### Integrate with [`@typescript-eslint`][typescript-eslint]

```js
/**
 * The eslint configuration.
 *
 * @type {import('eslint').Linter.Config[]}
 * @const config
 */
const config = [
  {
    files: ['**/*.+(cjs|cts|js|jsx|mjs|mts|ts|tsx)'],
    rules: {
      '@typescript-eslint/promise-function-async': [
        2,
        {
          allowedPromiseNames: ['Thenable']
        }
      ]
    }
  }
]

export default config
```

## API

`when` exports the identifiers listed below.

The default export is [`when`][when].

### `isCatchable<T>(value)`

Check if `value` looks like a [`Thenable`][thenable] that can be caught.

#### Type Parameters

- `T` (`any`)
  — the resolved value

#### Parameters

- `value` (`unknown`)
  — the thing to check

#### Returns

([`value is Catchable<T>`][catchable])
`true` if `value` is a [*thenable*][thenable-term] with a [`catch`][catch] method, `false` otherwise

### `isFinalizable<T>(value)`

Check if `value` looks like a [`Thenable`][thenable] that can be finalized.

#### Type Parameters

- `T` (`any`)
  — the resolved value

#### Parameters

- `value` (`unknown`)
  — the thing to check

#### Returns

([`value is Finalizable<T>`][finalizable])
`true` if `value` is a [*thenable*][thenable-term] with a [`finally`][finally] method, `false` otherwise

### `isPromise<T>(value[, finalizable])`

Check if `value` looks like a `Promise`.

> 👉 **Note**: This function intentionally performs structural checks instead of brand checks.
> It does not rely on `instanceof Promise` or constructors, making it compatible with cross-realm
> promises and custom thenables.

#### Type Parameters

- `T` (`any`)
  — the resolved value

#### Parameters

- `value` (`unknown`)
  — the thing to check
- `finalizable` (`boolean` | `null` | `undefined`)
  — whether a [`finally`][finally] method is required.\
  when `false`, only [`then`][then] and [`catch`][catch] are checked

#### Returns

(`value is Promise<T>`)
`true` if `value` is a [*thenable*][thenable-term] with a [`catch`][catch] method,
and [`finally`][finally] method (if requested), `false` otherwise

### `isPromiseLike<T>(value)`

Check if `value` looks like a `PromiseLike` structure.

#### Type Parameters

- `T` (`any`)
  — the resolved value

#### Parameters

- `value` (`unknown`)
  — the thing to check

#### Returns

([`value is PromiseLike<T>`][promiselike])
`true` if `value` is an object or function with a [`then`][then] method, `false` otherwise

### `isThenable<T>(value)`

Check if `value` looks like a [*thenable*][thenable-term].

#### Type Parameters

- `T` (`any`)
  — the resolved value

#### Parameters

- `value` (`unknown`)
  — the thing to check

#### Returns

([`value is Thenable<T>`][thenable]) `true` if `value` is an object or function with a [`then`][then] method,
and maybe-callable methods [`catch`][catch] and/or [`finally`][finally], `false` otherwise

<!--lint disable-->

### `when<T[, Next][, Failure][, Args][, Error][, This][, Result]>(value, chain[, fail][, context][, ...args])`

<!--lint enable-->

Chain a callback, calling the function after `value` is resolved,
or immediately if `value` is not a [*thenable*][thenable-term].

#### Overloads

```ts
function when<
  T,
  Next = any,
  Args extends any[] = any[],
  This = unknown,
  Result extends Awaitable<Next> = Awaitable<Next>
>(
  this: void,
  value: Awaitable<T>,
  chain: Chain<T, Next, Args, This>,
  fail?: null | undefined,
  context?: This | null | undefined,
  ...args: Args
): Result
```

```ts
function when<
  T,
  Next = any,
  Failure = Next,
  Args extends any[] = any[],
  Error = any,
  This = unknown,
  Result extends Awaitable<Failure | Next> = Awaitable<Failure | Next>
>(
  this: void,
  value: Awaitable<T>,
  chain: Chain<T, Next, Args, This>,
  fail?: Fail<Failure, Error, This> | null | undefined,
  context?: This | null | undefined,
  ...args: Args
): Result
```

```ts
function when<
  T,
  Next = any,
  Failure = Next,
  Args extends any[] = any[],
  Error = any,
  This = unknown,
  Result extends Awaitable<Failure | Next> = Awaitable<Failure | Next>
>(
  this: void,
  value: Awaitable<T>,
  chain: Options<T, Next, Failure, Args, Error, This>
): Result
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
- `Result` ([`Awaitable<Failure | Next>`][awaitable], optional)
  — the next awaitable
  - **default**: [`Awaitable<Failure | Next>`][awaitable]

#### Parameters

- `value` ([`Awaitable<T>`][awaitable])
  — the current [*awaitable*][awaitable-term]
- `chain` ([`Chain<T, Next, Args, This>`][chain] | [`Options<T, Next, Failure, Args, Error, This>`][options])
  — the chain callback or options for chaining
- `fail` ([`Fail<Failure, Error, This>`][fail] | `null` | `undefined`)
  — the callback to fire when a failure occurs. failures include:
  - rejections of the input [*thenable*][thenable-term]
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

A synchronous or [*thenable*][thenable-term] value (`type`).

```ts
type Awaitable<T> = Thenable<T> | T
```

#### Type Parameters

- `T` (`any`)
  — the resolved value

### `Catch<[T][, Reason]>`

Attach a callback only for the rejection of a [`Thenable`][thenable] (`type`).

```ts
type Catch<T = unknown, Reason = any> = <Next = never>(
  this: unknown,
  onrejected?: OnRejected<Next, Reason> | null | undefined
) => Thenable<Next | T>
```

#### Type Parameters

- `T` (`any`, optional)
  — the resolved value
  - **default**: `unknown`
- `Reason` (`any`, optional)
  — the reason for the rejection
  - **default**: `any`
- `Next` (`any`, optional)
  — the next resolved value
  - **default**: `never`

#### Parameters

- `onrejected` ([`OnRejected<Next, Reason>`][onrejected] | `null` | `undefined`)
  — the callback to execute when the thenable is rejected

#### Returns

([`Thenable<Next | T>`][thenable]) The next [*thenable*][thenable-term]

### `Catchable<[T]>`

A [`Thenable`][thenable] that can be caught (`interface`).

#### Extends

- [`Thenable<T>`][thenable]

#### Type Parameters

- `T` (`any`, optional)
  — the resolved value
  - **default**: `any`

#### Properties

- `catch` ([`Catch<T>`][catch])
  — attach a callback only to be invoked on rejection

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

### `Finalizable<[T]>`

A [`Thenable`][thenable] that can be finalized (`interface`).

#### Extends

- [`Thenable<T>`][thenable]

#### Type Parameters

- `T` (`any`, optional)
  — the resolved value
  - **default**: `any`

#### Properties

- `finally` ([`Finally<T>`][finally])
  — attach a callback only to be invoked on settlement (fulfillment or rejection)
  > 👉 **note**: the resolved value cannot be modified from the callback

### `Finally<[T]>`

Attach a callback that is invoked only when a [`Thenable`][thenable] is settled (fulfilled or rejected) (`type`).

```ts
type Finally<T = unknown> = (
  this: unknown,
  onfinally?: OnFinally | null | undefined
) => Thenable<T>
```

#### Type Parameters

- `T` (`any`, optional)
  — the resolved value
  - **default**: `unknown`

#### Parameters

- `onfinally` ([`OnFinally`][onfinally] | `null` | `undefined`)
  — the callback to execute when the thenable is settled

#### Returns

([`Thenable<T>`][thenable]) The next [*thenable*][thenable-term]

### `OnFinally`

The callback to execute when a [`Thenable`][thenable] is settled (fulfilled or rejected) (`type`).

```ts
type OnFinally = (this: unknown) => undefined | void
```

#### Returns

(`undefined` | `void`) Nothing

### `OnFulfilled<T[, Next]>`

The callback to execute when a [`Thenable`][thenable] is resolved (`type`).

```ts
type OnFulfilled<T, Next = T> = (this: unknown, value: T) => Awaitable<Next>
```

#### Type Parameters

- `T` (`any`)
  — the resolved value
- `Next` (`any`, optional)
  — the next resolved value
  - **default**: `T`

#### Parameters

- `value` (`T`)
  — the resolved value

#### Returns

([`Awaitable<Next>`][awaitable]) The next [*awaitable*][awaitable-term]

### `OnRejected<Next[, Reason]>`

The callback to execute when a [`Thenable`][thenable] is rejected (`type`).

```ts
type OnRejected<
  Next,
  Reason = any
> = (this: unknown, reason: Reason) => Awaitable<Next>
```

#### Type Parameters

- `Next` (`any`, optional)
  — the next resolved value
  - **default**: `any`
- `Reason` (`any`, optional)
  — the reason for the rejection
  - **default**: `any`

#### Parameters

- `reason` (`Reason`)
  — the reason for the rejection

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
  - rejections of the input [*thenable*][thenable-term]
  - rejections returned from `chain`
  - synchronous errors thrown in `chain`\
    if no `fail` handler is provided, failures are re-thrown or re-propagated.
  > 👉 **note**: for thenables, this callback is passed to `then` as the `onrejected` parameter,
  > and if implemented, to [`catch`][catch] as well to prevent unhandled rejections.

### `PromiseLike<T>`

To ensure native `Promise` and `PromiseLike` are assignable to [`Thenable`][thenable],
`when` ships a small global augmentation for `PromiseLike`.

No new methods or overloads are introduced — the `then` signature is rewritten to match
the official [TypeScript][] lib definition (as in `lib.es2015.d.ts`).

This is required for both compatibility, and type inference when mixing `Thenable` with built-in promise types.

#### Type Parameters

- `T` (`any`)
  — the resolved value

### `Then<T[, Reason]>`

Attach callbacks for the resolution and/or rejection of a [`Thenable`][thenable] (`type`).

```ts
type Then<T = unknown, Reason = any> = <Succ = T, Fail = never>(
  this: unknown,
  onfulfilled?: OnFulfilled<T, Succ> | null | undefined,
  onrejected?: OnRejected<Fail, Reason> | null | undefined
) => Thenable<Fail | Succ>
```

#### Type Parameters

- `T` (`any`, optional)
  — the previously resolved value
  - **default**: `unknown`
- `Reason` (`any`, optional)
  — the reason for a rejection
  - **default**: `any`
- `Succ` (`any`, optional)
  — the next resolved value on success
  - **default**: `T`
- `Fail` (`any`, optional)
  — the next resolved value on failure
  - **default**: `never`

#### Parameters

- `onfulfilled` ([`OnFulfilled<T, Succ>`][onfulfilled] | `null` | `undefined`)
  — the callback to execute when the thenable is resolved
- `onrejected` ([`OnRejected<Fail, Reason>`][onrejected] | `null` | `undefined`)
  — the callback to execute when the thenable is rejected

#### Returns

([`Thenable<Fail | Succ>`][thenable]) The next [*thenable*][thenable-term]

### `Thenable<[T]>`

The completion of an asynchronous operation, and the minimal structural contract required
by [`when`][when] to treat a value as asynchronous (`interface`).

Unlike `PromiseLike`, this interface allows a maybe-callable [`catch`][catch] method, which when present,
is used by [`when`][when] to ensure failures are handled without forcing promise allocation.

Maybe-callable methods are named so because they are not required,
and may be a method implementation, `null`, or `undefined`.

#### Type Parameters

- `T` (`any`, optional)
  — the resolved value
  - **default**: `any`

#### Properties

- `catch?` ([`Catch<T>`][catch] | `null` | `undefined`)
  — attach a callback only to be invoked on rejection
- `then` ([`Then<T>`][then])
  — attach callbacks to be invoked on resolution (fulfillment) and/or rejection
- `finally?` ([`Finally<T>`][finally] | `null` | `undefined`)
  — attach a callback only to be invoked on settlement (fulfillment or rejection)
  > 👉 **note**: the resolved value cannot be modified from the callback

## Glossary

### *awaitable*

A synchronous or [*thenable*][thenable-term] value.

### *thenable*

An object or function with a [`then`][then] method.

JavaScript engines use duck-typing for promises.
Arrays, functions, and objects with a `then` method will be treated as promise-like objects, and work with built-in
mechanisms like [`Promise.resolve`][promise-resolve] and the [`await` keyword][await] like native promises.

Some thenables also implement a [`catch`][catch] method (like native promises).
When available, [`when`][when] uses it to ensure rejections are handled.

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

[catch]: #catcht-reason

[catchable]: #catchablet

[chain]: #chaint-next-args-this

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[fail]: #failnext-error-this

[finalizable]: #finalizablet

[finally]: #finallyt

[iscatchable]: #iscatchabletvalue

[isfinalizable]: #isfinalizabletvalue

[ispromise]: #ispromisetvalue-finalizable

[ispromiselike]: #ispromiseliketvalue

[isthenable]: #isthenabletvalue

[onfinally]: #onfinally

[onfulfilled]: #onfulfilledt-next

[onrejected]: #onrejectednext-reason

[options]: #optionst-next-failure-args-error-this

[promise-resolve]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve

[promise-then]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

[promiselike]: #promiseliket

[semver]: https://semver.org

[then]: #thent-reason

[thenable-term]: #thenable

[thenable]: #thenablet

[typescript-eslint]: https://typescript-eslint.io

[typescript]: https://www.typescriptlang.org

[when]: #whent-next-failure-args-error-this-resultvalue-chain-fail-context-args

[yarn]: https://yarnpkg.com
