/**
 * @file Type Tests - Finally
 * @module when/types/tests/unit-d/Finally
 */

import type TestSubject from '#types/finally'
import type { JsonValue, Nilable } from '@flex-development/tutils'
import type { OnFinally, Thenable } from '@flex-development/when'

describe('unit-d:types/Finally', () => {
  type T = JsonValue
  type Subject = TestSubject<T>

  it('should match [this: unknown]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [(OnFinally | null | undefined)?]', () => {
      expectTypeOf<Subject>()
        .parameters
        .toEqualTypeOf<[Nilable<OnFinally>?]>()
    })
  })

  describe('returns', () => {
    it('should return Thenable<T>', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<Thenable<T>>()
    })
  })
})
