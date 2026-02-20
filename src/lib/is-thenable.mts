/**
 * @file isThenable
 * @module when/lib/isThenable
 */

/**
 * Check if `value` looks like a thenable,
 * i.e. a {@linkcode PromiseLike} object.
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
function isThenable<T>(this: void, value: unknown): value is PromiseLike<T> {
  if (!value) return false
  if (typeof value !== 'function' && typeof value !== 'object') return false
  return 'then' in value && typeof value.then === 'function'
}

export default isThenable
