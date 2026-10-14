
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SpaceflightNewsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = SpaceflightNewsSDK.test()
    equal(testsdk instanceof SpaceflightNewsSDK, true,
      'SpaceflightNewsSDK.test() must return a client synchronously')
  })

})
