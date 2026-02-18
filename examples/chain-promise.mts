/**
 * @file Examples - chainPromise
 * @module examples/chain-promise
 */

import { isThenable, when, type Awaitable } from '@flex-development/when'
import { ok } from 'devlop'

/**
 * The result.
 *
 * @const {Awaitable<number>} result
 */
const result: Awaitable<number> = when(Promise.resolve(2), n => n + 1)

ok(isThenable(result), 'expected `result` to be thenable')
console.dir(await result) // 3
