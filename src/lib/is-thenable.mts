/**
 * @file isThenable
 * @module when/lib/isThenable
 */

import hasThen from '#lib/is-promise-like'
import type { Thenable } from '@flex-development/when'

export default isThenable

/**
 * Check if `value` looks like a {@linkcode Thenable}.
 *
 * @see {@linkcode Thenable}
 *
 * @template {any} T
 *  The resolved value
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The thing to check
 * @return {value is Thenable<T>}
 *  `true` if `value` is an object or function with a `then` method,
 *  and maybe-callable methods `catch` and/or `finally`, `false` otherwise
 */
function isThenable<T>(this: void, value: unknown): value is Thenable<T> {
  if (!hasThen(value)) return false // no `then` method, cannot be a thenable.

  // a thenable without a `catch` or `finally` method.
  if (!('catch' in value) && !('finally' in value)) return true

  // cannot be a thenable, invalid `catch` property.
  if (!maybeCallable(value['catch' as never])) return false

  // cannot be a thenable, invalid `finally` property.
  if (!maybeCallable(value['finally' as never])) return false

  return true // thenable.
}

/**
 * @internal
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The thing to check
 * @return {((...args: any[]) => any) | null | undefined}
 *  `true` if `value` is a function, `null`, or `undefined`, `false` otherwise
 */
function maybeCallable(
  this: void,
  value: unknown
): value is ((...args: any[]) => any) | null | undefined {
  return value == null || typeof value === 'function'
}
