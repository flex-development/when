/**
 * @file Type Aliases - Executor
 * @module when/types/Executor
 */

import type { Awaitable } from '@flex-development/when'
import type { Reject, Resolve } from '@flex-development/when/testing'

/**
 * A callback used to initialize a thenable.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode Resolve}
 * @see {@linkcode Reject}
 *
 * @template {any} [T=any]
 *  The resolved value
 * @template {any} [Reason=any]
 *  The reason for the rejection
 *
 * @this {void}
 *
 * @param {Resolve<T>} resolve
 *  The callback used to resolve the thenable with a value
 *  or the result of another awaitable
 * @param {Reject<Reason>} reject
 *  The callback used to reject the thenable with a provided reason or error
 * @return {undefined | void}
 */
type Executor<T = any, Reason = any> = (
  this: void,
  resolve: Resolve<T>,
  reject: Reject<Reason>
) => undefined | void

export type { Executor as default }
