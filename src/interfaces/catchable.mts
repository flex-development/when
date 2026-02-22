/**
 * @file Interfaces - Catchable
 * @module when/interfaces/Catchable
 */

import type { Catch, Thenable } from '@flex-development/when'

/**
 * A thenable that can be caught.
 *
 * @see {@linkcode Thenable}
 *
 * @template {any} [T=any]
 *  The resolved value
 *
 * @extends {Thenable<T>}
 */
interface Catchable<T = any> extends Thenable<T> {
  /**
   * Attach a callback only to be invoked on rejection.
   *
   * @see {@linkcode Catch}
   *
   * @override
   */
  catch: Catch<T>
}

export type { Catchable as default }
