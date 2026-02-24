/**
 * @file Type Tests - Finish
 * @module when/types/tests/unit-d/Finish
 */

import type TestSubject from '#types/finish'

describe('unit-d:types/Finish', () => {
  type This = undefined
  type Subject = TestSubject<This>

  it('should match [this: This]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<This>()
  })

  describe('parameters', () => {
    it('should be callable with []', () => {
      expectTypeOf<Subject>().parameters.toEqualTypeOf<[]>()
    })
  })

  describe('returns', () => {
    it('should return undefined | void', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<undefined | void>()
    })
  })
})
