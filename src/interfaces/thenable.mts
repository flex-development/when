/**
 * @file Interfaces - Thenable
 * @module when/interfaces/Thenable
 */

import type { Catch, Finally, Then } from '@flex-development/when'

/**
 * The completion of an asynchronous operation, and the minimal structural
 * contract required by `when` to treat a value as asynchronous.
 *
 * Unlike {@linkcode PromiseLike}, this interface allows maybe-callable `catch`
 * and `finally` methods, which when present, are used by `when` to ensure
 * failures are handled and post-processing hooks are executed without forcing
 * promise allocation.
 *
 * Maybe-callable methods are named so because they are not required,
 * and may be a method implementation, `null`, or `undefined`.
 *
 * @template {any} [T=any]
 *  The resolved value
 */
interface Thenable<T = any> {
  /**
   * Attach a callback only to be invoked on rejection.
   *
   * @see {@linkcode Catch}
   */
  catch?: Catch<T> | null | undefined

  /**
   * Attach a callback only to be invoked
   * on settlement (fulfillment or rejection).
   *
   * > 👉 **Note**: The resolved value cannot be modified from the callback.
   *
   * @see {@linkcode Finally}
   */
  finally?: Finally<T> | null | undefined

  /**
   * Attach callbacks to be invoked on resolution (fulfillment)
   * and/or rejection.
   *
   * @see {@linkcode Then}
   */
  then: Then<T>
}

export type { Thenable as default }
