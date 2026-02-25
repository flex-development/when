/**
 * @file Examples - createThenable
 * @module examples/create-thenable
 */

import {
  isCatchable,
  isFinalizable,
  type Thenable
} from '@flex-development/when'
import { createThenable } from '@flex-development/when/testing'
import { ok } from 'devlop'

/**
 * The thenable.
 *
 * @const {Thenable<number>} thenable
 */
const thenable: Thenable<number> = createThenable(resolve => resolve(10))

ok(isCatchable(thenable), 'expected `thenable` to be a catchable')
ok(isFinalizable(thenable), 'expected `thenable` to be a finalizable')

console.dir(await thenable.then(value => value + 3)) // 13
