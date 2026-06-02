import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [vue()],
    build: {
        // Emit fonts (and other binary assets) as separate hashed files in
        // dist/assets/ rather than base64-inlining them into style.css — keeps
        // CSS small and lets the self-hosted woff2 be cached + font-display:swap.
        assetsInlineLimit: 0,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'PhlixUi',
            formats: ['es', 'cjs'],
            fileName: (format) => `phlix-ui.${format === 'es' ? 'js' : 'umd.cjs'}`,
        },
        rollupOptions: {
            external: ['vue', 'vue-router', 'pinia'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
        sourcemap: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
    },
});
