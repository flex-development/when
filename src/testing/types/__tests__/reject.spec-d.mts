/**
 * @file Type Tests - Reject
 * @module when/testing/types/tests/unit-d/Reject
 */

import type TestSubject from '#testing/types/reject'
import type { JsonObject } from '@flex-development/tutils'

describe('unit-d:testing/types/Reject', () => {
  type Reason = Error & { cause: JsonObject[] }
  type Subject = TestSubject<Reason>

  it('should match [this: void]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Reason]', () => {
      expectTypeOf<Subject>().parameters.toEqualTypeOf<[Reason]>()
    })
  })

  describe('returns', () => {
    it('should return undefined', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<undefined>()
    })
  })
})
