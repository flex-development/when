/**
 * @file isPromise
 * @module when/lib/isPromise
 */

import isCatchable from '#lib/is-catchable'
import isFinalizable from '#lib/is-finalizable'
import isThenable from '#lib/is-thenable'

/**
 * Check if `value` looks like a {@linkcode Promise}.
 *
 * > 👉 **Note**: This function intentionally performs structural checks
 * > instead of brand checks.
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
 * @param {boolean | null | undefined} [finalizable=true]
 *  Whether a `finally` method is required.\
 *  When `false`, only `then` and `catch` are checked
 * @return {value is Promise<T>}
 *  `true` if `value` is a thenable with a `catch` method,
 *  and `finally` method (if requested), `false` otherwise
 */
function isPromise<T>(
  this: void,
  value: unknown,
  finalizable?: boolean | null | undefined
): value is Promise<T> {
  if (!(isThenable(value) && isCatchable(value))) return false
  return finalizable ?? true ? isFinalizable(value) : true
}

export default isPromise
