/**
 * @file isPromiseLike
 * @module when/lib/isPromiseLike
 */

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
 * @return {value is PromiseLike<T>}
 *  `true` if `value` is {@linkcode PromiseLike} object, `false` otherwise
 */
function isPromiseLike<T>(this: void, value: unknown): value is PromiseLike<T> {
  return (
    !Array.isArray(value) &&
    typeof value === 'object' &&
    value !== null &&
    'then' in value &&
    typeof value.then === 'function'
  )
}

export default isPromiseLike
