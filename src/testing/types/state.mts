/**
 * @file Type Aliases - State
 * @module when/types/State
 */

import type { Awaitable } from '@flex-development/when'

/**
 * Union of thenable states.
 *
 * @internal
 *
 * @see {@linkcode Awaitable}
 *
 * @template {any} [T=any]
 *  The resolved value
 * @template {any} [Reason=unknown]
 *  The reason for the rejection
 */
type State<T = any, Reason = unknown> =
  | { ok: false; reason: Reason }
  | { ok: true; value: Awaitable<T> }

export type { State as default }
