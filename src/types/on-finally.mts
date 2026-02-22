/**
 * @file Type Aliases - OnFinally
 * @module when/types/OnFinally
 */

/**
 * The callback to execute when a `Thenable` is settled (fulfilled or rejected).
 *
 * @this {unknown}
 *
 * @return {undefined | void}
 */
type OnFinally = (this: unknown) => undefined | void

export type { OnFinally as default }
