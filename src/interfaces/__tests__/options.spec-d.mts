/**
 * @file Type Tests - Options
 * @module when/types/tests/unit-d/Options
 */

import type TestSubject from '#interfaces/options'
import type { Nilable } from '@flex-development/tutils'
import type { Chain, Reject } from '@flex-development/when'

describe('unit-d:interfaces/Options', () => {
  type T = URL | string
  type Next = string
  type Args = [T]
  type Self = undefined
  type Subject = TestSubject<T, Next, Args, Self>

  it('should match [args?: Args | null | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('args')
      .toEqualTypeOf<Nilable<Args>>()
  })

  it('should match [chain: Chain<T, Next, Args, Self>]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('chain')
      .toEqualTypeOf<Chain<T, Next, Args, Self>>()
  })

  it('should match [context?: Self | null | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('context')
      .toEqualTypeOf<Nilable<Self>>()
  })

  it('should match [reject?: Reject<Next, any, Self> | null | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('reject')
      .toEqualTypeOf<Nilable<Reject<Next, any, Self>>>()
  })
})
