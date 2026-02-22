/**
 * @file Type Tests - OnFinally
 * @module when/types/tests/unit-d/OnFinally
 */

import type TestSubject from '#types/on-finally'

describe('unit-d:types/OnFinally', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with []', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[]>()
    })
  })

  describe('returns', () => {
    it('should return undefined | void', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<undefined | void>()
    })
  })
})
