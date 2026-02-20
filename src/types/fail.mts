/**
 * @file Type Aliases - Fail
 * @module when/types/Fail
 */

import type { Awaitable } from '@flex-development/when'

/**
 * The callback to fire when a failure occurs.
 *
 * @see {@linkcode Awaitable}
 *
 * @template {any} [Next=any]
 *  The next resolved value
 * @template {any} [Error=any]
 *  The error to handle
 * @template {any} [This=unknown]
 *  The `this` context
 *
 * @this {This}
 *
 * @param {unknown} e
 *  The error
 * @return {Awaitable<Next>}
 *  The next awaitable
 */
type Fail<
  Next = any,
  Error = any,
  This = unknown
> = (this: This, e: Error) => Awaitable<Next>

export type { Fail as default }
