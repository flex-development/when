/**
 * @file Type Tests - Catchable
 * @module when/types/tests/unit-d/Catchable
 */

import type TestSubject from '#interfaces/catchable'
import type { Catch, Thenable } from '@flex-development/when'

describe('unit-d:interfaces/Catchable', () => {
  type T = URL
  type Subject = TestSubject<T>

  it('should allow Promise<T>', () => {
    expectTypeOf<Promise<T>>().toExtend<Subject>()
  })

  it('should extend Thenable<T>', () => {
    expectTypeOf<Subject>().toExtend<Thenable<T>>()
  })

  it('should match [catch: Catch<T>]', () => {
    expectTypeOf<Subject>().toHaveProperty('catch').toEqualTypeOf<Catch<T>>()
  })
})
