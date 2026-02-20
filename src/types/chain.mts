/**
 * @file Type Aliases - Chain
 * @module when/types/Chain
 */

import type { Awaitable } from '@flex-development/when'

/**
 * A chain callback.
 *
 * @see {@linkcode Awaitable}
 *
 * @template {any} [T=any]
 *  The previously resolved value
 * @template {any} [Next=any]
 *  The next resolved value
 * @template {ReadonlyArray<any>} [Args=any[]]
 *  The function arguments
 * @template {any} [This=unknown]
 *  The `this` context
 *
 * @this {This}
 *
 * @param {[...Args, T]} params
 *  The function parameters, with the last being the previously resolved value.\
 *  In cases where a promise is not being resolved,
 *  this is the same `value` passed to `when`
 * @return {Awaitable<Next>}
 *  The next awaitable
 */
type Chain<
  T = any,
  Next = any,
  Args extends readonly any[] = any[],
  This = unknown
> = (this: This, ...params: [...Args, T]) => Awaitable<Next>

export type { Chain as default }
