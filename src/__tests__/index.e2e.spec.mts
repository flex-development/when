/**
 * @file E2E Tests - api
 * @module when/tests/e2e/api
 */

import * as testSubject from '@flex-development/when'

describe('e2e:when', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
