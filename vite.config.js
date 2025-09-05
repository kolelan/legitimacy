import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'Legitimacy',
            fileName: (format) => {
                switch (format) {
                    case 'es':
                        return 'legitimacy.es.js';
                    case 'umd':
                        return 'legitimacy.umd.js';
                    default:
                        return 'legitimacy.js';
                }
            }
        },
        rollupOptions: {
            // Убедимся, что все внешние зависимости исключены
            external: [],
            output: {
                exports: 'named',
                globals: {}
            }
        },
        minify: true,
        sourcemap: true
    },
    test: {
        environment: 'node'
    }
});