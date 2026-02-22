/**
 * @file Examples - bindThis
 * @module examples/bind-this
 */

import when from '@flex-development/when'

/**
 * The `this` context.
 */
type Context = { prefix: string }

/**
 * The result.
 *
 * @const {string} result
 */
const result: string = when(13, id, null, { prefix: 'id:' })

console.log(result) // 'id:13'

/**
 * @this {Context}
 *
 * @param {number | string} num
 *  The id number
 * @return {string}
 *  The id string
 */
function id(this: Context, num: number | string): string {
  return this.prefix + num
}
