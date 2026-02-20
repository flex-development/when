/**
 * @file Type Tests - Fail
 * @module when/types/tests/unit-d/Fail
 */

import type TestSubject from '#types/fail'
import type { Awaitable } from '@flex-development/when'

describe('unit-d:types/Fail', () => {
  type Fail = Error
  type Next = URL | null
  type This = { ignoreErrors?: boolean | null | undefined }
  type Subject = TestSubject<Next, Fail, This>

  it('should match [this: This]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<This>()
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
