/**
 * @file rollup
 * @module config/rollup
 */

import resolve from '@rollup/plugin-node-resolve'
import type {
  NormalizedOutputOptions,
  OutputBundle,
  PluginContext,
  RollupOptions
} from 'rollup'
import { dts } from 'rollup-plugin-dts'
import pkg from './package.json' with { type: 'json' }

/**
 * The list of target files.
 *
 * @const {ReadonlyArray<string>} files
 */
const files: readonly string[] = [
  './dist/index.d.mts',
  './dist/testing/index.d.mts'
]

/**
 * The rollup configuration.
 *
 * @see {@linkcode RollupOptions}
 *
 * @type {RollupOptions[]}
 */
export default files.map(file => ({
  external: file.includes('testing') ? [pkg.name] : undefined,
  input: file,
  output: [{ file, format: 'esm' }],
  plugins: [
    resolve({ extensions: ['.d.mts', '.mts'] }),
    dts(),
    {
      /**
       * Re-add lost `type` modifiers.
       *
       * The {@linkcode dts} plugin loses `type` modifiers during bundling.
       *
       * @see https://github.com/Swatinem/rollup-plugin-dts/issues/354
       *
       * @this {PluginContext}
       *
       * @param {NormalizedOutputOptions} options
       *  The normalized output options
       * @param {OutputBundle} bundle
       *  The output bundle object
       * @return {undefined}
       */
      generateBundle(
        this: PluginContext,
        options: NormalizedOutputOptions,
        bundle: OutputBundle
      ): undefined {
        for (const output of Object.values(bundle)) {
          if (output.type === 'chunk') {
            output.code = output.code.replaceAll('import {', 'import type {')
          }
        }

        return void this
      }
    }
  ]
}))
