/**
 * @file when
 * @module when/lib/when
 */

import isCatchable from '#lib/is-catchable'
import isThenable from '#lib/is-thenable'
import type {
  Awaitable,
  Chain,
  Fail,
  Options
} from '@flex-development/when'

export default when

/**
 * Chain a callback, calling the function after `value` is resolved,
 * or immediately if `value` is not a thenable.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode Chain}
 * @see {@linkcode Fail}
 *
 * @template {any} T
 *  The previously resolved value
 * @template {any} [Next=any]
 *  The next resolved value
 * @template {ReadonlyArray<any>} [Args=any[]]
 *  The chain function arguments
 * @template {any} [This=any]
 *  The `this` context
 * @template {Awaitable<Next>} [Result=Awaitable<Next>]
 *  The next awaitable
 *
 * @this {void}
 *
 * @param {Awaitable<T>} value
 *  The current awaitable
 * @param {Chain<T, Next, Args, This>} chain
 *  The chain callback
 * @param {null | undefined} [fail]
 *  The callback to fire when a failure occurs
 * @param {This | null | undefined} [context]
 *  The `this` context of the chain and `fail` callbacks
 * @param {Args} args
 *  The arguments to pass to the chain callback
 * @return {Result}
 *  The next awaitable
 */
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

/**
 * Chain a callback, calling the function after `value` is resolved,
 * or immediately if `value` is not a thenable.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode Chain}
 * @see {@linkcode Fail}
 *
 * @template {any} T
 *  The previously resolved value
 * @template {any} [Next=any]
 *  The next resolved value
 * @template {any} [Failure=Next]
 *  The next resolved value on failure
 * @template {ReadonlyArray<any>} [Args=any[]]
 *  The chain function arguments
 * @template {any} [Error=any]
 *  The error to possibly handle
 * @template {any} [This=any]
 *  The `this` context
 * @template {Awaitable<Failure | Next>} [Result=Awaitable<Failure | Next>]
 *  The next awaitable
 *
 * @this {void}
 *
 * @param {Awaitable<T>} value
 *  The current awaitable
 * @param {Chain<T, Next, Args, This>} chain
 *  The chain callback
 * @param {Fail<Failure, Error, This> | null | undefined} [fail]
 *  The callback to fire when a failure occurs
 * @param {This | null | undefined} [context]
 *  The `this` context of the chain and `fail` callbacks
 * @param {Args} args
 *  The arguments to pass to the chain callback
 * @return {Result}
 *  The next awaitable
 */
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

/**
 * Chain a callback, calling the function after `value` is resolved,
 * or immediately if `value` is not a thenable.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode Options}
 *
 * @template {any} T
 *  The previously resolved value
 * @template {any} [Next=any]
 *  The next resolved value
 * @template {any} [Failure=Next]
 *  The next resolved value on failure
 * @template {ReadonlyArray<any>} [Args=any[]]
 *  The chain function arguments
 * @template {any} [Error=any]
 *  The error to possibly handle
 * @template {any} [This=unknown]
 *  The `this` context
 * @template {Awaitable<Failure | Next>} [Result=Awaitable<Failure | Next>]
 *  The next awaitable
 *
 * @this {void}
 *
 * @param {Awaitable<T>} value
 *  The current awaitable
 * @param {Options<T, Next, Failure, Args, Error, This>} chain
 *  Options for chaining
 * @return {Result}
 *  The next awaitable
 */
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

/**
 * Chain a callback, calling the function after `value` is resolved,
 * or immediately if `value` is not a thenable.
 *
 * @see {@linkcode Chain}
 * @see {@linkcode Options}
 * @see {@linkcode Fail}
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The current awaitable
 * @param {Chain<any, unknown> | Options} chain
 *  The chain callback or options for chaining
 * @param {Fail | null | undefined} [fail]
 *  The callback to fire when a failure occurs
 * @param {unknown} [context]
 *  The `this` context of the chain and `fail` callbacks
 * @param {unknown[]} args
 *  The arguments to pass to the chain callback
 * @return {unknown}
 *  The next awaitable
 */
function when(
  this: void,
  value: unknown,
  chain: Chain<any, unknown> | Options,
  fail?: Fail | null | undefined,
  context?: unknown,
  ...args: unknown[]
): unknown {
  if (typeof chain === 'object') {
    fail = chain.fail
    context = chain.context
    args = chain.args ?? []
    chain = chain.chain
  }

  // no promise, call chain function immediately.
  if (!isThenable(value)) {
    try {
      // try attaching "global" rejection handler with `catch`.
      return katch(chain.call(context, ...args, value))
    } catch (e: unknown) {
      return failure(e)
    }
  }

  // already have a promise, chain the chain callback.
  value = value.then(res => chain.call(context, ...args, res), failure)

  // try attaching "global" rejection handler with `catch`.
  return katch(value)

  /**
   * @this {void}
   *
   * @param {unknown} e
   *  The error to handle
   * @return {unknown}
   *  The rejection result
   * @throws {unknown}
   */
  function failure(this: void, e: unknown): unknown {
    if (typeof fail !== 'function') throw e
    return fail.call(context, e)
  }

  /**
   * Try attaching a rejection handler with `catch`.
   *
   * @this {void}
   *
   * @param {unknown} value
   *  The awaitable
   * @return {unknown}
   *  The `value`
   */
  function katch(this: void, value: unknown): unknown {
    if (isCatchable(value)) value = value.catch(failure)
    return value
  }
}
