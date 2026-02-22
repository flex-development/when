/**
 * @file Type Aliases - Finally
 * @module when/types/Finally
 */

import type { OnFinally, Thenable } from '@flex-development/when'

/**
 * Attach a callback that is invoked only when a `Thenable`
 * is settled (fulfilled or rejected).
 *
 * > 👉 **Note**: The resolved value cannot be modified from the callback.
 *
 * @see {@linkcode OnFinally}
 * @see {@linkcode Thenable}
 *
 * @template {any} [T=unknown]
 *  The resolved value
 *
 * @this {unknown}
 *
 * @param {OnFinally | null | undefined} [onfinally]
 *  The callback to execute when the thenable is settled
 * @return {Thenable<T>}
 *  The next thenable
 */
type Finally<T = unknown> = (
  this: unknown,
  onfinally?: OnFinally | null | undefined
) => Thenable<T>

export type { Finally as default }
