/**
 * @file isPromiseLike
 * @module when/lib/isPromiseLike
 */

/**
 * Check if `value` looks like a {@linkcode PromiseLike} structure.
 *
 * @template {any} T
 *  The resolved value
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The thing to check
 * @return {value is PromiseLike<T>}
 *  `true` if `value` is an object or function with a `then` method,
 *  `false` otherwise
 */
function isPromiseLike<T>(this: void, value: unknown): value is PromiseLike<T> {
  if (typeof value !== 'function' && typeof value !== 'object') return false
  return !!value && 'then' in value && typeof value.then === 'function'
}

export default isPromiseLike
