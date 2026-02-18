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
const result: Awaitable<number> = when(1, Math.min, null, undefined, 2, 3, 4)

console.dir(result) // 1
