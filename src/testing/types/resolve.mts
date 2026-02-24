/**
 * @file Type Aliases - Resolve
 * @module when/types/Resolve
 */

import type { Awaitable } from '@flex-development/when'

/**
 * The callback used to resolve a thenable with a value
 * or the result of another awaitable.
 *
 * @see {@linkcode Awaitable}
 *
 * @template {any} [T=any]
 *  The resolved value
 *
 * @this {void}
 *
 * @param {Awaitable<T>} value
 *  The awaitable
 * @return {undefined}
 */
type Resolve<T = any> = (this: void, value: Awaitable<T>) => undefined

export type { Resolve as default }
