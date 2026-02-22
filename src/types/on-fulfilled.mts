/**
 * @file Type Aliases - OnFulfilled
 * @module when/types/OnFulfilled
 */

import type { Awaitable } from '@flex-development/when'

/**
 * The callback to execute when a `Thenable` is resolved.
 *
 * @see {@linkcode Awaitable}
 *
 * @template {any} T
 *  The resolved value
 * @template {any} [Next=T]
 *  The next resolved value
 *
 * @this {unknown}
 *
 * @param {T} value
 *  The resolved value
 * @return {Awaitable<Next>}
 *  The next awaitable
 */
type OnFulfilled<T, Next = T> = (this: unknown, value: T) => Awaitable<Next>

export type { OnFulfilled as default }
