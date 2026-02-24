/**
 * @file E2E Tests - testing/api
 * @module when/testing/tests/e2e/api
 */

import * as testSubject from '@flex-development/when/testing'

describe('e2e:when/testing', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
