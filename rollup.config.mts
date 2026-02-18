/**
 * @file rollup
 * @module config/rollup
 */

import nodeResolve from '@rollup/plugin-node-resolve'
import type { RollupOptions } from 'rollup'
import { dts } from 'rollup-plugin-dts'

/**
 * The target file.
 *
 * @const {string} file
 */
const file: string = './dist/index.d.mts'

/**
 * The rollup configuration.
 *
 * @see {@linkcode RollupOptions}
 *
 * @type {RollupOptions}
 */
export default {
  input: file,
  output: [{ file, format: 'esm' }],
  plugins: [nodeResolve({ extensions: ['.d.mts', '.mts'] }), dts()]
}
