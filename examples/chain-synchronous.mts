/**
 * @file Examples - chainSynchronous
 * @module examples/chain-synchronous
 */

import { isThenable, when } from '@flex-development/when'
import { ok } from 'devlop'

/**
 * The result.
 *
 * @const {number} result
 */
const result: number = when(0, n => n + 1)

ok(!isThenable(result), 'expected `result` to not be thenable')
console.dir(result) // 1
