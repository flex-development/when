/**
 * @file Type Tests - State
 * @module when/testing/types/tests/unit-d/state
 */

import type TestSubject from '#testing/types/state'
import type { Awaitable } from '@flex-development/when'

describe('unit-d:testing/types/State', () => {
  type T = URL | string
  type Reason = Error
  type Subject = TestSubject<T, Reason>

  it('should extract { ok: false; reason: Reason }', () => {
    expectTypeOf<Subject>()
      .extract<{ ok: false; reason: Reason }>()
      .not.toBeNever()
  })

  it('should extract { ok: true; value: Awaitable<T> }', () => {
    expectTypeOf<Subject>()
      .extract<{ ok: true; value: Awaitable<T> }>()
      .not.toBeNever()
  })
})
