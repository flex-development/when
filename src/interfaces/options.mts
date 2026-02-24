/**
 * @file Interfaces - Options
 * @module when/interfaces/Options
 */

import type { Chain, Fail, Finish } from '@flex-development/when'

/**
 * Options for chaining.
 *
 * @template {any} [T=any]
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
 */
interface Options<
  T = any,
  Next = any,
  Failure = Next,
  Args extends readonly any[] = any[],
  Error = any,
  This = any
> {
  /**
   * The arguments to pass to the {@linkcode chain} callback.
   */
  args?: Args | null | undefined

  /**
   * The chain callback.
   *
   * > 👉 **Note**: For thenables, this callback is passed to `then` as
   * > the `onfulfilled` parameter.
   *
   * @see {@linkcode Chain}
   * @see {@linkcode PromiseLike.then}
   */
  chain: Chain<T, Next, Args, This>

  /**
   * The `this` context of the {@linkcode chain} and {@linkcode fail} callbacks.
   */
  context?: This | null | undefined

  /**
   * The callback to fire when a failure occurs.
   *
   * Failures include:
   *
   * - Rejections of the input thenable
   * - Rejections returned from {@linkcode chain}
   * - Synchronous errors thrown in {@linkcode chain}
   *
   * If no `fail` handler is provided, failures are re-thrown or re-propagated.
   *
   * > 👉 **Note**: For thenables, this callback is passed to `then` as
   * > the `onrejected` parameter, and if implemented, to `catch` as well
   * > to prevent unhandled rejections.
   *
   * @see {@linkcode Fail}
   * @see {@linkcode Promise.catch}
   * @see {@linkcode PromiseLike.then}
   *
   * @since 2.0.0
   */
  fail?: Fail<Failure, Error, This> | null | undefined

  /**
   * The callback to invoke after chaining completes, whether the operation
   * succeeds or fails.
   *
   * It runs exactly once after {@linkcode chain} and {@linkcode fail}, cannot
   * affect the resolved value, and does not intercept errors.
   *
   * @see {@linkcode Finish}
   *
   * @since 3.0.0
   */
  finish?: Finish<This> | null | undefined
}

export type { Options as default }
