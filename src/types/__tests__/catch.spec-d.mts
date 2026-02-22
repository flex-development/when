/**
 * @file Type Tests - Catch
 * @module when/types/tests/unit-d/Catch
 */

import type TestSubject from '#types/catch'
import type { JsonValue, Nilable } from '@flex-development/tutils'
import type { OnRejected, Thenable } from '@flex-development/when'

describe('unit-d:types/Catch', () => {
  type T = JsonValue
  type Reason = Error
  type Subject = TestSubject<T, Reason>

  it('should match [this: unknown]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [(OnRejected<Next, Reason> | null | undefined)?]', () => {
      expectTypeOf<Subject>()
        .parameters
        .toEqualTypeOf<[Nilable<OnRejected<unknown, Reason>>?]>()
    })
  })

  describe('returns', () => {
    it('should return Thenable<Next | T>', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<Thenable<unknown>>()
    })
  })
})
