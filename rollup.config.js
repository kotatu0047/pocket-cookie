import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

const extensions = ['.ts']

export default [
  {
    input: 'src/main.ts',
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins: [
      resolve({ extensions }),
      babel({
        babelrc: false,
        extensions,
        presets: [
          [
            '@babel/preset-env',
            {
              loose: true,
              modules: false,
              targets: '>1%',
            },
          ],
          '@babel/preset-typescript',
        ],
        plugins: [
          ['@babel/proposal-class-properties', { loose: true }],
          ['@babel/proposal-object-rest-spread', { loose: true }],
        ],
        exclude: 'node_modules/**',
      }),
    ],
  },
]
