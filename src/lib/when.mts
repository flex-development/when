/**
 * @file when
 * @module when/lib/when
 */

import isPromiseLike from '#lib/is-promise-like'
import type {
  Awaitable,
  Chain,
  Options,
  Reject
} from '@flex-development/when'

export default when

/**
 * Chain a callback, calling the function after `value` is resolved,
 * or immediately if `value` is not a promise.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode Chain}
 * @see {@linkcode Reject}
 *
 * @template {any} T
 *  The previously resolved value
 * @template {any} [Next=any]
 *  The next resolved value
 * @template {ReadonlyArray<any>} [Args=any[]]
 *  The chain function arguments
 * @template {any} [Self=any]
 *  The `this` context
 *
 * @this {void}
 *
 * @param {Awaitable<T>} value
 *  The promise or the resolved value
 * @param {Chain<T, Next, Args, Self>} chain
 *  The chain callback
 * @param {Reject<Next, any, Self>} [reject]
 *  The callback to fire when a promise is rejected or an error is thrown
 * @param {Self | null | undefined} [context]
 *  The `this` context of the chain and error callbacks
 * @param {Args} args
 *  The arguments to pass to the chain callback
 * @return {Awaitable<Next>}
 *  The next promise or value
 */
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

/**
 * Chain a callback, calling the function after `value` is resolved,
 * or immediately if `value` is not a promise.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode Options}
 *
 * @template {any} T
 *  The previously resolved value
 * @template {any} [Next=any]
 *  The next resolved value
 * @template {ReadonlyArray<any>} [Args=any[]]
 *  The chain function arguments
 * @template {any} [Self=unknown]
 *  The `this` context
 *
 * @this {void}
 *
 * @param {Awaitable<T>} value
 *  The promise or the resolved value
 * @param {Options<T, Next, Args, Self>} chain
 *  Options for chaining
 * @return {Awaitable<Next>}
 *  The next promise or value
 */
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

/**
 * Chain a callback, calling the function after `value` is resolved,
 * or immediately if `value` is not a promise.
 *
 * @see {@linkcode Chain}
 * @see {@linkcode Options}
 * @see {@linkcode Reject}
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The promise or the resolved value
 * @param {Chain<any, unknown> | Options} chain
 *  The chain callback or options for chaining
 * @param {Reject | null | undefined} [reject]
 *  The callback to fire when a promise is rejected or an error is thrown
 * @param {unknown} [context]
 *  The `this` context of the chain and error callbacks
 * @param {unknown[]} args
 *  The arguments to pass to the chain callback
 * @return {unknown}
 *  The next promise or value
 */
function when(
  this: void,
  value: unknown,
  chain: Chain<any, unknown> | Options,
  reject?: Reject | null | undefined,
  context?: unknown,
  ...args: unknown[]
): unknown {
  if (typeof chain === 'object') {
    reject = chain.reject
    context = chain.context
    args = chain.args ?? []
    chain = chain.chain
  }

  // no promise, call chain function immediately.
  if (!isPromiseLike(value)) {
    try {
      return chain.call(context, ...args, value)
    } catch (e: unknown) {
      return fail(e)
    }
  }

  // already have a promise, chain callback.
  return value.then(resolved => chain.call(context, ...args, resolved), fail)

  /**
   * @this {void}
   *
   * @param {unknown} e
   *  The error to handle
   * @return {unknown}
   *  The rejection result
   * @throws {unknown}
   */
  function fail(this: void, e: unknown): unknown {
    if (typeof reject !== 'function') throw e
    return reject.call(context, e)
  }
}
