/**
 * @file Type Aliases - Then
 * @module when/types/Then
 */

import type { OnFulfilled, OnRejected, Thenable } from '@flex-development/when'

/**
 * Attach callbacks for the resolution and/or rejection of a `Thenable`.
 *
 * @see {@linkcode OnFulfilled}
 * @see {@linkcode OnRejected}
 * @see {@linkcode Thenable}
 *
 * @template {any} [T=unknown]
 *  The previously resolved value
 * @template {any} [Reason=any]
 *  The reason for a rejection
 * @template {any} [Succ=T]
 *  The next resolved value on success
 * @template {any} [Fail=never]
 *  The next resolved value on failure
 *
 * @this {unknown}
 *
 * @param {OnFulfilled<T, Succ> | null | undefined} [onfulfilled]
 *  The callback to execute when the thenable is resolved
 * @param {OnRejected<Fail, Reason> | null | undefined} [onrejected]
 *  The callback to execute when the thenable is rejected
 * @return {Thenable<Fail | Succ>}
 *  The next thenable
 */
type Then<T = unknown, Reason = any> = <Succ = T, Fail = never>(
  this: unknown,
  onfulfilled?: OnFulfilled<T, Succ> | null | undefined,
  onrejected?: OnRejected<Fail, Reason> | null | undefined
) => Thenable<Fail | Succ>

export type { Then as default }
