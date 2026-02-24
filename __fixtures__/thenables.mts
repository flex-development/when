/**
 * @file Fixtures - thenables
 * @module fixtures/thenables
 */

import boom from '#fixtures/boom'
import resolved from '#fixtures/resolved'
import createThenable from '#testing/lib/create-thenable'
import type ThenableType from '#tests/types/thenable-type'
import type { Thenable } from '@flex-development/when'

/**
 * Record, where each key is a {@linkcode ThenableType}
 * and each value is a thenable.
 *
 * @type {Record<ThenableType, Thenable<boolean>>}
 */
const thenables: Record<ThenableType, Thenable<boolean>> = {
  fail: createThenable((succ, fail) => fail(boom), { catch: true }),
  succ: createThenable(succ => succ(resolved.succ))
}

export default thenables
