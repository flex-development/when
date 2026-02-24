/**
 * @file Functional Tests - createThenable
 * @module when/testing/lib/tests/functional/createThenable
 */

import boom from '#fixtures/boom'
import resolved from '#fixtures/resolved'
import isPromise from '#lib/is-promise'
import testSubject from '#testing/lib/create-thenable'
import thrower from '#tests/utils/thrower'
import { faker } from '@faker-js/faker'
import { constant, identity } from '@flex-development/tutils'
import type {
  Catchable,
  Finalizable,
  OnFinally,
  OnFulfilled,
  OnRejected,
  Thenable
} from '@flex-development/when'
import type { Mock } from 'vitest'

describe('functional:testing/lib/createThenable', () => {
  it('should adopt foreign thenables', async () => {
    // Arrange
    const value: Thenable = new Promise(resolve => resolve(resolved.succ))

    // Act
    const result = testSubject(succ => succ(value))

    // Expect
    expect(result).to.satisfy(isPromise)
    await expect(result).resolves.to.eq(resolved.succ)
  })

  it('should adopt returned thenables', async () => {
    // Arrange
    const innerValue: number = 3
    const inner: Thenable<number> = testSubject(succ => succ(innerValue))
    const value: number = faker.number.int()

    // Act
    const result = testSubject(succ => succ(value))
      .then(constant(inner))
      .then(resolved => resolved + 10)

    // Expect (remaining checks)
    expect(result).to.satisfy(isPromise)
    await expect(result).resolves.to.eq(13)
  })

  it('should return a thenable from `catch`', async () => {
    // Act
    const result = testSubject(succ => succ(resolved.succ)).catch!()

    // Expect
    expect(result).to.satisfy(isPromise)
    await expect(result).resolves.to.eq(resolved.succ)
  })

  it('should return a thenable from `finally`', async () => {
    // Act
    const result = testSubject(succ => succ(resolved.succ)).finally!()

    // Expect
    expect(result).to.satisfy(isPromise)
    await expect(result).resolves.to.eq(resolved.succ)
  })

  it('should return a thenable from `then`', async () => {
    // Act
    const result = testSubject(succ => succ(resolved.succ)).then()

    // Expect
    expect(result).to.satisfy(isPromise)
    await expect(result).resolves.to.eq(resolved.succ)
  })

  it('should use `finally` implementation', async () => {
    // Arrange
    const onfinally: Mock<OnFinally> = vi.fn()

    // Act
    const result: Finalizable = testSubject(succ => succ(resolved.succ))

    // Expect
    await expect(result.finally(onfinally)).resolves.to.eq(resolved.succ)
    expect(onfinally).toHaveBeenCalledTimes(1)
  })

  describe('errors', () => {
    it('should adopt foreign rejection without `onrejected`', async () => {
      // Act
      let result = testSubject(succ => succ(resolved.succ))
      result = result.then(vi.fn().mockRejectedValue(boom))

      // Expect
      await expect(result.then()).rejects.to.throw(boom)
    })

    it('should propagate rejection without `onrejected`', async () => {
      // Act
      const result = testSubject((succ, fail) => fail(boom))

      // Expect
      await expect(result.then()).rejects.to.throw(boom)
    })

    it('should skip `onfulfilled` when rejected', async () => {
      // Arrange
      const onfulfilled: Mock<OnFulfilled<unknown>> = vi.fn()

      // Act
      const result = testSubject((succ, fail) => fail(boom))

      // Expect
      await expect(result.then(onfulfilled, identity)).resolves.to.eq(boom)
      expect(onfulfilled).toHaveBeenCalledTimes(0)
    })

    it('should throw when `executor` throws', async () => {
      await expect(testSubject(thrower)).rejects.to.throw(boom)
    })

    it('should throw when `onfulfilled` throws', async () => {
      // Act
      const result = testSubject(succ => succ(resolved.succ))

      // Expect
      await expect(result.then(thrower)).rejects.to.throw(boom)
    })

    it('should use `catch` implementation', async () => {
      // Arrange
      const onrejected: Mock<OnRejected<boolean>> = vi.fn()

      // Setup
      onrejected.mockResolvedValue(resolved.fail)

      // Act
      const result: Catchable = testSubject((succ, fail) => fail(boom))

      // Expect
      await expect(result.catch(onrejected)).resolves.to.eq(resolved.fail)
      expect(onrejected).toHaveBeenCalledTimes(1)
    })

    it('should use `finally` implementation', async () => {
      // Arrange
      const onfinally: Mock<OnFinally> = vi.fn()

      // Act
      const result: Finalizable = testSubject((succ, fail) => fail(boom))

      // Expect
      await expect(result.finally(onfinally)).rejects.to.throw(boom)
      expect(onfinally).toHaveBeenCalledTimes(1)
    })
  })
})
