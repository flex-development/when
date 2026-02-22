/**
 * @file Type Aliases - OnRejected
 * @module when/types/OnRejected
 */

import type { Awaitable } from '@flex-development/when'

/**
 * The callback to execute when a `Thenable` is rejected.
 *
 * @see {@linkcode Awaitable}
 *
 * @template {any} Next
 *  The next resolved value
 * @template {any} [Reason=any]
 *  The reason for the rejection
 *
 * @this {unknown}
 *
 * @param {Reason} reason
 *  The reason for the rejection
 * @return {Awaitable<Next>}
 *  The next awaitable
 */
type OnRejected<
  Next,
  Reason = any
> = (this: unknown, reason: Reason) => Awaitable<Next>

export type { OnRejected as default }
