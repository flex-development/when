/**
 * @file Examples - handleRejectionsAndErrors
 * @module examples/handle-rejections-and-errors
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
const result: Awaitable<boolean> = when(value, chain, reject)

console.dir(await result) // false

/**
 * @this {null}
 *
 * @return {true}
 *  The success result
 */
function chain(this: null): true {
  return true
}

/**
 * @this {null}
 *
 * @param {Error} e
 *  The error to handle
 * @return {false}
 *  The failure result
 */
function reject(this: null, e: Error): false {
  return console.dir(e), false
}
