/**
 * @file Fixtures - resolved
 * @module fixtures/resolved
 */

import type ThenableType from '#tests/types/thenable-type'

/**
 * Record, where each key is a {@linkcode ThenableType}
 * and each value is a resolved value.
 *
 * @type {Record<ThenableType, boolean>}
 */
export default { fail: false, succ: true }
