/**
 * @file Type Tests - Executor
 * @module when/testing/types/tests/unit-d/Executor
 */

import type TestSubject from '#testing/types/executor'
import type { JsonObject } from '@flex-development/tutils'
import type { Reject, Resolve } from '@flex-development/when/testing'

describe('unit-d:testing/types/Executor', () => {
  type T = URL | string
  type Reason = Error & { cause: JsonObject }
  type Subject = TestSubject<T, Reason>

  it('should match [this: void]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Resolve<T>, Reject<Reason>]', () => {
      expectTypeOf<Subject>()
        .parameters
        .toEqualTypeOf<[Resolve<T>, Reject<Reason>]>()
    })
  })

  describe('returns', () => {
    it('should return undefined | void', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<undefined | void>()
    })
  })
})
