/**
 * @file Type Aliases - Awaitable
 * @module when/types/Awaitable
 */

import type { Thenable } from '@flex-development/when'

/**
 * A synchronous or thenable value.
 *
 * @see {@linkcode Thenable}
 *
 * @template {any} T
 *  The resolved value
 */
type Awaitable<T> = Thenable<T> | T

export type { Awaitable as default }
