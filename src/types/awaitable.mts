/**
 * @file Type Aliases - Awaitable
 * @module when/types/Awaitable
 */

/**
 * A synchronous or thenable value.
 *
 * @template {any} T
 *  The resolved value
 */
type Awaitable<T> = PromiseLike<T> | T

export type { Awaitable as default }
