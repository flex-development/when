/**
 * @file when
 * @module when/lib/when
 */

import isCatchable from '#lib/is-catchable'
import isFinalizable from '#lib/is-finalizable'
import isThenable from '#lib/is-thenable'
import type {
  Awaitable,
  Chain,
  Fail,
  Finish,
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
  /**
   * The post-processing hook.
   *
   * @var {Finish | null | undefined}
   */
  let finish: Finish | null | undefined

  /**
   * Whether the post-processing hook ran.
   *
   * @var {boolean}
   */
  let finished: boolean = false

  if (typeof chain === 'object') {
    fail = chain.fail
    finish = chain.finish
    context = chain.context
    args = chain.args ?? []
    chain = chain.chain
  }

  // no thenable, call chain function immediately.
  if (!isThenable(value)) {
    try {
      // try attaching "global" rejection handler with `catch`,
      // then try running `finish`, or attaching it with `finally`.
      return finalize(katch(chain.call(context, ...args, value)))
    } catch (e: unknown) {
      return finalize(katch(failure(e)))
    }
  }

  // already have a thenable, chain the chain callback.
  value = value.then(res => chain.call(context, ...args, res), failure)

  // try attaching "global" rejection handler with `catch`,
  // then try running `finish`, or attaching it with `finally`.
  return finalize(katch(value))

  /**
   * @this {void}
   *
   * @param {unknown} e
   *  The error to handle
   * @return {unknown}
   *  The rejection result or never, may throw `e`
   */
  function failure(this: void, e: unknown): unknown {
    if (typeof fail !== 'function') return thrower(e)
    return fail.call(context, e)
  }

  /**
   * @this {void}
   *
   * @return {undefined}
   */
  function fin(this: void): undefined {
    return void (finished || (finished = true, finish?.call(context)))
  }

  /**
   * @this {void}
   *
   * @param {unknown} value
   *  The awaitable
   * @return {unknown}
   *  The `value`
   */
  function finalize(this: void, value: unknown): unknown {
    if (typeof finish === 'function') {
      if (isFinalizable(value)) return value.finally(fin)
      if (isThenable(value)) return value.then(identity, thrower)
    }

    return identity(value)

    /**
     * @this {void}
     *
     * @param {unknown} value
     *  The resolved value
     * @return {unknown}
     *  The `value`
     */
    function identity(this: void, value: unknown): unknown {
      return fin(), value
    }
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

  /**
   * @this {void}
   *
   * @param {unknown} e
   *  The error to throw
   * @return {never}
   *  Never; throws `e`
   * @throws {unknown}
   */
  function thrower(this: void, e: unknown): never {
    void fin()
    throw e
  }
}
