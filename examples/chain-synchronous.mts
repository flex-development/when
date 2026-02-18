/**
 * @file Examples - chainSynchronous
 * @module examples/chain-synchronous
 */

import { isThenable, when, type Awaitable } from '@flex-development/when'
import { ok } from 'devlop'

/**
 * The result.
 *
 * @const {Awaitable<number>} result
 */
const result: Awaitable<number> = when(0, n => n + 1)

ok(!isThenable(result), 'expected `result` to not be thenable')
console.dir(result) // 1
