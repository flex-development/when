/**
 * @file Examples - handleFailures
 * @module examples/handle-failures
 */

import when, { type Awaitable } from '@flex-development/when'

/**
 * The thenable value.
 *
 * @const {PromiseLike<never>} value
 */
const value: PromiseLike<never> = new Promise((resolve, reject) => {
  return void reject(new Error('nope', { cause: { url: import.meta.url } }))
})

/**
 * The result.
 *
 * @const {Awaitable<boolean>} result
 */
const result: Awaitable<boolean> = when(value, chain, fail)

console.dir(await result) // false

/**
 * @this {void}
 *
 * @return {true}
 *  The success result
 */
function chain(this: void): true {
  return true
}

/**
 * @this {void}
 *
 * @param {Error} e
 *  The error to handle
 * @return {false}
 *  The failure result
 */
function fail(this: void, e: Error): false {
  return console.dir(e), false
}
