/**
 * @file eslint
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

import fldv from '@flex-development/eslint-config'

/**
 * The eslint configuration.
 *
 * @type {import('eslint').Linter.Config[]}
 * @const config
 */
const config = [
  ...fldv.configs.node,
  {
    files: ['**/*.+(cjs|cts|js|jsx|mjs|mts|ts|tsx)'],
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    },
    rules: {
      '@typescript-eslint/promise-function-async': [
        2,
        {
          allowedPromiseNames: ['Thenable']
        }
      ],
      eqeqeq: [2, 'smart']
    }
  },
  {
    files: [
      'src/lib/__tests__/is-catchable.spec.mts',
      'src/lib/__tests__/is-finalizable.spec.mts',
      'src/lib/__tests__/is-promise.spec.mts',
      'src/lib/__tests__/is-promise-like.spec.mts',
      'src/lib/__tests__/is-thenable.spec.mts',
      'src/lib/__tests__/when.spec.mts'
    ],
    rules: {
      'unicorn/no-thenable': 0
    }
  },
  {
    files: [
      'src/lib/when.mts',
      'src/testing/lib/__tests__/create-thenable.functional.spec.mts'
    ],
    rules: {
      'promise/prefer-await-to-then': 0
    }
  },
  {
    files: ['src/testing/lib/create-thenable.mts'],
    rules: {
      '@typescript-eslint/only-throw-error': 0,
      '@typescript-eslint/promise-function-async': 0,
      'promise/prefer-await-to-then': 0,
      'unicorn/catch-error-name': 0,
      'unicorn/no-thenable': 0
    }
  },
  {
    files: ['src/types/chain.mts'],
    rules: {
      'jsdoc/valid-types': 0
    }
  }
]

export default config
