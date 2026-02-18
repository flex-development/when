/**
 * @file Interfaces - Options
 * @module when/interfaces/Options
 */

import type { Chain, Reject } from '@flex-development/when'

/**
 * Options for chaining.
 *
 * @template {any} [T=any]
 *  The previously resolved value
 * @template {any} [Next=any]
 *  The next resolved value
 * @template {ReadonlyArray<any>} [Args=any[]]
 *  The chain function arguments
 * @template {any} [Self=any]
 *  The `this` context
 */
interface Options<
  T = any,
  Next = any,
  Args extends readonly any[] = any[],
  Self = any
> {
  /**
   * The arguments to pass to the {@linkcode chain} callback.
   */
  args?: Args | null | undefined

  /**
   * The chain callback.
   *
   * @see {@linkcode Chain}
   */
  chain: Chain<T, Next, Args, Self>

  /**
   * The `this` context of the {@linkcode chain}
   * and {@linkcode reject} callbacks.
   */
  context?: Self | null | undefined

  /**
   * The callback to fire when a promise is rejected or an error is thrown.
   *
   * @see {@linkcode Reject}
   */
  reject?: Reject<Next, any, Self> | null | undefined
}

export type { Options as default }
