/**
 * @file Type Tests - Resolve
 * @module when/testing/types/tests/unit-d/Resolve
 */

import type TestSubject from '#testing/types/resolve'
import type { Awaitable } from '@flex-development/when'

describe('unit-d:testing/types/Resolve', () => {
  type T = URL
  type Subject = TestSubject<T>

  it('should match [this: void]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Awaitable<T>]', () => {
      expectTypeOf<Subject>().parameters.toEqualTypeOf<[Awaitable<T>]>()
    })
  })

  describe('returns', () => {
    it('should return undefined', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<undefined>()
    })
  })
})
