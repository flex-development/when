/**
 * @file Type Aliases - Reject
 * @module when/types/Reject
 */

import type { Awaitable } from '@flex-development/when'

/**
 * The callback to fire when a promise is rejected
 * or an error is thrown from a synchronous function.
 *
 * @see {@linkcode Awaitable}
 *
 * @template {any} [Next=any]
 *  The next resolved value
 * @template {any} [Fail=any]
 *  The error to handle
 * @template {any} [Self=unknown]
 *  The `this` context
 *
 * @this {Self}
 *
 * @param {unknown} e
 *  The error
 * @return {Awaitable<Next>}
 *  The next promise or value
 */
type Reject<
  Next = any,
  Fail = any,
  Self = unknown
> = (this: Self, e: Fail) => Awaitable<Next>

export type { Reject as default }
