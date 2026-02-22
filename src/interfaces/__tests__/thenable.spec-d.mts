/**
 * @file Type Tests - Thenable
 * @module when/types/tests/unit-d/Thenable
 */

import type TestSubject from '#interfaces/thenable'
import type { Nilable } from '@flex-development/tutils'
import type { Catch, Finally, Then } from '@flex-development/when'

describe('unit-d:interfaces/Thenable', () => {
  type T = Uint8Array | string
  type Subject = TestSubject<T>

  it('should allow Promise<T>', () => {
    expectTypeOf<Promise<T>>().toExtend<Subject>()
  })

  it('should allow PromiseLike<T>', () => {
    expectTypeOf<PromiseLike<T>>().toExtend<Subject>()
  })

  it('should match [catch?: Catch<T> | null | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('catch')
      .toEqualTypeOf<Nilable<Catch<T>>>()
  })

  it('should match [finally?: Finally<T> | null | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('finally')
      .toEqualTypeOf<Nilable<Finally<T>>>()
  })

  it('should match [then: Then<T>]', () => {
    expectTypeOf<Subject>().toHaveProperty('then').toEqualTypeOf<Then<T>>()
  })
})
