/**
 * @file Examples - useOptionsObject
 * @module examples/use-optionsObject
 */

import when, { type Awaitable } from '@flex-development/when'

/**
 * The `this` context.
 */
type Context = { errors: Error[] }

/**
 * The thenable value.
 *
 * @const {Promise<number>} value
 */
const value: Promise<number> = new Promise(resolve => resolve(3))

/**
 * The result.
 *
 * @const {Awaitable<number | undefined>} result
 */
const result: Awaitable<number | undefined> = when(value, {
  args: [39],
  chain: divide,
  context: { errors: [] },
  fail
})

console.dir(await result) // 13

/**
 * @this {void}
 *
 * @param {number} dividend
 *  The number to divide
 * @param {number} divisor
 *  The number to divide by
 * @return {number}
 *  The quotient
 */
function divide(this: void, dividend: number, divisor: number): number {
  return dividend / divisor
}

/**
 * @this {Context}
 *
 * @param {Error} e
 *  The error to handle
 * @return {undefined}
 */
function fail(this: Context, e: Error): undefined {
  return void this.errors.push(e)
}
