/**
 * @file Type Aliases - Finish
 * @module when/types/Finish
 */

/**
 * A post-processing hook invoked exactly once after an awaitable settles,
 * regardless of success or failure.
 *
 * The resolved value cannot be modified from the hook,
 * and any error is re-thrown after execution.
 *
 * @template {any} [This=unknown]
 *  The `this` context
 *
 * @this {This}
 *
 * @return {undefined | void}
 */
type Finish<This = unknown> = (this: This) => undefined | void

export type { Finish as default }
