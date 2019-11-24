import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

const extensions = ['.ts']

export default [
  {
    input: 'src/pocket-cookie.ts',
    output: {
      file: pkg.module,
      format: 'esm',
    },
    // context: 'window',
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
      commonjs({
        include: 'node_modules/**',
        extensions: ['.js', '.coffee'],
        // if true then uses of `global` won't be dealt with by this plugin
        ignoreGlobal: false, // Default: false
        sourceMap: false, // Default: true

        // explicitly specify unresolvable named exports
        // (see below for more details)
        namedExports: undefined, // Default: undefined

        // sometimes you have to leave require statements
        // unconverted. Pass an array containing the IDs
        // or a `id => boolean` function. Only use this
        // option if you know what you're doing!
        ignore: ['conditional-runtime-dependency'],
      }),
    ],
  },
]
