/**
 * @file Type Tests - Fail
 * @module when/types/tests/unit-d/Fail
 */

import type TestSubject from '#types/fail'
import type { Awaitable } from '@flex-development/when'

describe('unit-d:types/Fail', () => {
  type Reason = Error
  type Next = URL | null
  type This = { ignoreErrors?: boolean | null | undefined }
  type Subject = TestSubject<Next, Reason, This>

  it('should match [this: This]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<This>()
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
