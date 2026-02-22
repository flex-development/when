/**
 * @file Type Tests - OnFulfilled
 * @module when/types/tests/unit-d/OnFulfilled
 */

import type TestSubject from '#types/on-fulfilled'
import type { JsonValue } from '@flex-development/tutils'
import type { Awaitable } from '@flex-development/when'

describe('unit-d:types/OnFulfilled', () => {
  type T = JsonValue
  type Next = string
  type Subject = TestSubject<T, Next>

  it('should match [this: unknown]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [T]', () => {
      expectTypeOf<Subject>().parameters.toEqualTypeOf<[T]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<Next>', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<Awaitable<Next>>()
    })
  })
})
