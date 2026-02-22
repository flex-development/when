/**
 * @file Type Tests - Finalizable
 * @module when/types/tests/unit-d/Finalizable
 */

import type TestSubject from '#interfaces/finalizable'
import type { Finally, Thenable } from '@flex-development/when'

describe('unit-d:interfaces/Finalizable', () => {
  type T = string
  type Subject = TestSubject<T>

  it('should allow Promise<T>', () => {
    expectTypeOf<Promise<T>>().toExtend<Subject>()
  })

  it('should extend Thenable<T>', () => {
    expectTypeOf<Subject>().toExtend<Thenable<T>>()
  })

  it('should match [finally: Finally<T>]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('finally')
      .toEqualTypeOf<Finally<T>>()
  })
})
