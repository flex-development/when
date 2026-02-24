/**
 * @file Type Tests - CreateThenableOptions
 * @module when/testing/interfaces/tests/unit-d/CreateThenableOptions
 */

import type TestSubject from '#testing/interfaces/create-thenable-options'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:testing/interfaces/CreateThenableOptions', () => {
  it('should match [catch?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('catch')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [finally?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('finally')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
