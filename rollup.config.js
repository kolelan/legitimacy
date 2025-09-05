import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.BUILD === 'production';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/legitimacy.min.js',
            format: 'umd',
            name: 'Legitimacy',
            exports: 'named',
            plugins: [terser()],
            sourcemap: true
        },
        {
            file: 'dist/legitimacy.js',
            format: 'umd',
            name: 'Legitimacy',
            exports: 'named',
            sourcemap: true
        },
        {
            file: 'dist/legitimacy.esm.js',
            format: 'es',
            exports: 'named',
            sourcemap: true
        }
    ],
    plugins: [
        nodeResolve({
            browser: false,
            preferBuiltins: true
        }),
        commonjs(),
        isProduction && terser()
    ].filter(Boolean)
};