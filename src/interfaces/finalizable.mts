/**
 * @file Interfaces - Finalizable
 * @module when/interfaces/Finalizable
 */

import type { Finally, Thenable } from '@flex-development/when'

/**
 * A thenable that can be finalized.
 *
 * @see {@linkcode Thenable}
 *
 * @template {any} [T=any]
 *  The resolved value
 *
 * @extends {Thenable<T>}
 */
interface Finalizable<T = any> extends Thenable<T> {
  /**
   * Attach a callback only to be invoked
   * on settlement (fulfillment or rejection).
   *
   * > 👉 **Note**: The resolved value cannot be modified from the callback.
   *
   * @see {@linkcode Finally}
   *
   * @override
   */
  finally: Finally<T>
}

export type { Finalizable as default }
