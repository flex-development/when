/**
 * @file Type Tests - Options
 * @module when/types/tests/unit-d/Options
 */

import type TestSubject from '#interfaces/options'
import type { Nilable } from '@flex-development/tutils'
import type { Chain, Fail } from '@flex-development/when'

describe('unit-d:interfaces/Options', () => {
  type T = URL | string
  type Next = string
  type Failure = never
  type Error = unknown
  type Args = [T]
  type This = undefined
  type Subject = TestSubject<T, Next, Failure, Args, Error, This>

  it('should match [args?: Args | null | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('args')
      .toEqualTypeOf<Nilable<Args>>()
  })

  it('should match [chain: Chain<T, Next, Args, This>]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('chain')
      .toEqualTypeOf<Chain<T, Next, Args, This>>()
  })

  it('should match [context?: This | null | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('context')
      .toEqualTypeOf<Nilable<This>>()
  })

  it('should match [fail?: Fail<Failure, Error, This> | null | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('fail')
      .toEqualTypeOf<Nilable<Fail<Failure, Error, This>>>()
  })
})
