import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

export default [
    {
        input: 'src/main.ts',
        output: {
            file: pkg.cjs,
            format: 'cjs'
        },
        plugins: [
            resolve(),
            babel(
                {
                    babelrc: false,
                    extensions: ['.js', '.ts'],
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                modules: false,
                                targets: ">1%"
                            }
                        ],
                        '@babel/preset-typescript',
                    ],
                    exclude: 'node_modules/**'
                }
            ),
        ],
    },
    {
        input: 'src/main.ts',
        output: {
            file: pkg.module,
            format: 'esm'
        },
        plugins: [
            resolve(),
            babel(
                {
                    babelrc: false,
                    extensions: ['.js', '.ts'],
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                modules: false,
                                targets: ">1%"
                            }
                        ],
                        '@babel/preset-typescript',
                    ],
                    exclude: 'node_modules/**'
                }
            ),
        ],
    }
]
