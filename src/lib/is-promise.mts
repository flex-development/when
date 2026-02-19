/**
 * @file isPromise
 * @module when/lib/isPromise
 */

import isThenable from '#lib/is-thenable'

/**
 * Check if `value` looks like a promise.
 *
 * @template {any} T
 *  The resolved value
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The thing to check
 * @return {value is Promise<T>}
 *  `true` if `value` is a promise, `false` otherwise
 */
function isPromise<T>(this: void, value: unknown): value is Promise<T> {
  if (!isThenable(value)) return false
  return 'catch' in value && typeof value.catch === 'function'
}

export default isPromise
