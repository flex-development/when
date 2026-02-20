/**
 * @file isPromise
 * @module when/lib/isPromise
 */

import isThenable from '#lib/is-thenable'

/**
 * Check if `value` looks like a {@linkcode Promise}.
 *
 * > 👉 **Note**: This function intentionally performs a structural check
 * > instead of a brand check.
 * > It does not rely on `instanceof Promise` or constructors, making it
 * > compatible with cross-realm promises and custom thenables.
 *
 * @see {@linkcode isThenable}
 *
 * @template {any} T
 *  The resolved value
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The thing to check
 * @return {value is Promise<T>}
 *  `true` if `value` is a thenable with a `catch` method, `false` otherwise
 */
function isPromise<T>(this: void, value: unknown): value is Promise<T> {
  if (!isThenable(value)) return false
  return 'catch' in value && typeof value.catch === 'function'
}

export default isPromise
