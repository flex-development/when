/**
 * @file Type Tests - Chain
 * @module when/types/tests/unit-d/Chain
 */

import type TestSubject from '#types/chain'
import type { JsonValue } from '@flex-development/tutils'
import type { Awaitable } from '@flex-development/when'

describe('unit-d:types/Chain', () => {
  type T = JsonValue
  type Next = string
  type Args = [URL, URL]
  type Self = { ignoreErrors?: boolean | null | undefined }
  type Subject = TestSubject<T, Next, Args, Self>

  it('should match [this: Self]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<Self>()
  })

  describe('parameters', () => {
    it('should be callable with [...Args, T]', () => {
      expectTypeOf<Subject>().parameters.toEqualTypeOf<[...Args, T]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<Next>', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<Awaitable<Next>>()
    })
  })
})
