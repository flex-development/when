/**
 * @file isFinalizable
 * @module when/lib/isFinalizable
 */

import isThenable from '#lib/is-thenable'
import type { Finalizable } from '@flex-development/when'

/**
 * Check if `value` looks like a thenable that can be finalized.
 *
 * @see {@linkcode Finalizable}
 *
 * @template {any} T
 *  The resolved value
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The thing to check
 * @return {value is Finalizable<T>}
 *  `true` if `value` is a thenable with a `finally` method, `false` otherwise
 */
function isFinalizable<T>(this: void, value: unknown): value is Finalizable<T> {
  return isThenable(value) && typeof value.finally === 'function'
}

export default isFinalizable
