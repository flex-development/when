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
 * @template {any} [Reason=any]
 *  The reason for the failure
 * @template {any} [This=unknown]
 *  The `this` context
 *
 * @this {This}
 *
 * @param {Reason} reason
 *  The reason for the failure
 * @return {Awaitable<Next>}
 *  The next awaitable
 */
type Fail<
  Next = any,
  Reason = any,
  This = unknown
> = (this: This, reason: Reason) => Awaitable<Next>

export type { Fail as default }
