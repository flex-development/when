/**
 * @file Type Tests - Then
 * @module when/types/tests/unit-d/Then
 */

import type TestSubject from '#types/then'
import type { JsonValue } from '@flex-development/tutils'
import type { OnFulfilled, OnRejected, Thenable } from '@flex-development/when'

describe('unit-d:types/Then', () => {
  type T = JsonValue
  type Reason = Error
  type Subject = TestSubject<T, Reason>

  it('should match [this: unknown]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [(OnFulfilled<T, Succ> | null | undefined)?, (OnRejected<Fail, Reason> | null | undefined)?]', () => {
      // Arrange
      type Expect = [
        (OnFulfilled<T, unknown> | null | undefined)?,
        (OnRejected<unknown, Reason> | null | undefined)?
      ]

      // Expect
      expectTypeOf<Subject>().parameters.toEqualTypeOf<Expect>()
    })
  })

  describe('returns', () => {
    it('should return Thenable<Fail | Succ>', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<Thenable<unknown>>()
    })
  })
})
