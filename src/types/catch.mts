/**
 * @file Type Aliases - Catch
 * @module when/types/Catch
 */

import type { OnRejected, Thenable } from '@flex-development/when'

/**
 * Attach a callback only for the rejection of a `Thenable`.
 *
 * @see {@linkcode OnRejected}
 * @see {@linkcode Thenable}
 *
 * @template {any} [T=unknown]
 *  The resolved value
 * @template {any} [Reason=any]
 *  The reason for the rejection
 * @template {any} [Next=never]
 *  The next resolved value
 *
 * @this {unknown}
 *
 * @param {OnRejected<Next, Reason> | null | undefined} [onrejected]
 *  The callback to execute when the thenable is rejected
 * @return {Thenable<Next | T>}
 *  The next thenable
 */
type Catch<T = unknown, Reason = any> = <Next = never>(
  this: unknown,
  onrejected?: OnRejected<Next, Reason> | null | undefined
) => Thenable<Next | T>

export type { Catch as default }
