/**
 * @file Type Tests - Awaitable
 * @module when/types/tests/unit-d/Awaitable
 */

import type TestSubject from '#types/awaitable'
import type { Thenable } from '@flex-development/when'

describe('unit-d:types/Awaitable', () => {
  type T = Uint8Array | string | null | undefined
  type Subject = TestSubject<T>

  it('should allow Promise<T>', () => {
    expectTypeOf<Promise<T>>().toExtend<Subject>()
  })

  it('should allow PromiseLike<T>', () => {
    expectTypeOf<PromiseLike<T>>().toExtend<Subject>()
  })

  it('should extract Thenable<T>', () => {
    expectTypeOf<Subject>().extract<Thenable<T>>().not.toBeNever()
  })

  it('should extract T', () => {
    expectTypeOf<Subject>().extract<T>().not.toBeNever()
  })
})
