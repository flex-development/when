/**
 * @file Type Aliases - Reject
 * @module when/types/Reject
 */

/**
 * The callback used to reject a thenable with a provided reason or error.
 *
 * @template {any} [Reason=Error]
 *  The reason for the rejection
 *
 * @this {void}
 *
 * @param {Reason} reason
 *  The reason for the rejection
 * @return {undefined}
 */
type Reject<Reason = Error> = (this: void, reason: Reason) => undefined

export type { Reject as default }
