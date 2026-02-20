/**
 * @file Examples - passArguments
 * @module examples/pass-arguments
 */

import when, { type Awaitable } from '@flex-development/when'

/**
 * The result.
 *
 * @const {Awaitable<number>} result
 */
const result: Awaitable<number> = when(
  1, // last argument passed to `Math.min`
  Math.min, // `chain`
  null, // `fail`
  undefined, // `context`
  2, // first argument passed to `Math.min`
  3, // second argument passed to `Math.min`
  4 // third argument passed to `Math.min`
)

console.dir(result) // 1
