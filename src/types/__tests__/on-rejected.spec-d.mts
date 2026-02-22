/**
 * @file Type Tests - OnRejected
 * @module when/types/tests/unit-d/OnRejected
 */

import type TestSubject from '#types/on-rejected'
import type { Awaitable } from '@flex-development/when'

describe('unit-d:types/OnRejected', () => {
  type Next = undefined
  type Reason = Error
  type Subject = TestSubject<Next, Reason>

  it('should match [this: unknown]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [Reason]', () => {
      expectTypeOf<Subject>().parameters.toEqualTypeOf<[Reason]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<Next>', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<Awaitable<Next>>()
    })
  })
})
