/**
 * @file Type Tests - Awaitable
 * @module when/types/tests/unit-d/Awaitable
 */

import type TestSubject from '#types/awaitable'

describe('unit-d:types/Awaitable', () => {
  type T = Uint8Array | string | null | undefined
  type Subject = TestSubject<T>

  it('should allow Promise<T>', () => {
    expectTypeOf<Promise<T>>().toExtend<Subject>()
  })

  it('should extract PromiseLike<T>', () => {
    expectTypeOf<Subject>().extract<PromiseLike<T>>().not.toBeNever()
  })

  it('should extract T', () => {
    expectTypeOf<Subject>().extract<T>().not.toBeNever()
  })
})
