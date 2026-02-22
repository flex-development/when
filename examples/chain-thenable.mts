/**
 * @file Examples - chainThenable
 * @module examples/chain-thenable
 */

import { isPromise, when } from '@flex-development/when'
import { ok } from 'devlop'

/**
 * The result.
 *
 * @const {Promise<number>} result
 */
const result: Promise<number> = when(Promise.resolve(2), n => n + 1)

ok(isPromise(result), 'expected `result` to be a promise')
console.dir(await result) // 3
