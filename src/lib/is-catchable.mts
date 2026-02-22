/**
 * @file isCatchable
 * @module when/lib/isCatchable
 */

import isThenable from '#lib/is-thenable'
import type { Catchable } from '@flex-development/when'

/**
 * Check if `value` looks like a `Thenable` that can be caught.
 *
 * @see {@linkcode Catchable}
 *
 * @template {any} T
 *  The resolved value
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The thing to check
 * @return {value is Catchable<T>}
 *  `true` if `value` is a thenable with a `catch` method, `false` otherwise
 */
function isCatchable<T>(this: void, value: unknown): value is Catchable<T> {
  return isThenable(value) && typeof value.catch === 'function'
}

export default isCatchable
