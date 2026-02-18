/**
 * @file Type Tests - Reject
 * @module when/types/tests/unit-d/Reject
 */

import type TestSubject from '#types/reject'
import type { Awaitable } from '@flex-development/when'

describe('unit-d:types/Reject', () => {
  type Next = URL | null
  type Fail = Error
  type Self = { ignoreErrors?: boolean | null | undefined }
  type Subject = TestSubject<Next, Fail, Self>

  it('should match [this: Self]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<Self>()
  })

  describe('parameters', () => {
    it('should be callable with [Fail]', () => {
      expectTypeOf<Subject>().parameters.toEqualTypeOf<[Fail]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<Next>', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<Awaitable<Next>>()
    })
  })
})
