import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { resolve } from 'node:path';

export default defineConfig({
    // unplugin-icons resolves the `~icons/lucide/*` virtual modules that Icon.vue
    // imports, compiling each to an inline Vue SFC. Only the icons actually
    // imported get bundled (tree-shaken); no runtime icon font/sprite.
    plugins: [vue(), Icons({ compiler: 'vue3', scale: 1 })],
    build: {
        // Emit fonts (and other binary assets) as separate hashed files in
        // dist/assets/ rather than base64-inlining them into style.css — keeps
        // CSS small and lets the self-hosted woff2 be cached + font-display:swap.
        assetsInlineLimit: 0,
        // Keep CSS code-splitting DISABLED (the Vite lib-mode default). This repo
        // is a LIBRARY consumed via its prebuilt `dist/` (phlix-server/phlix-hub
        // `web-ui` resolve `@phlix/ui` → `dist/phlix-ui.js` and import only
        // `@phlix/ui/style.css`). In lib mode Vite does NOT inject async-chunk CSS
        // at runtime — split chunks get `/* empty css */` markers and no dist JS
        // references them — so any code-split CSS would be INERT in the consumers
        // (admin AND every lazy page rendered unstyled: the UI-3.3 `cssCodeSplit`
        // regression). With splitting off, ALL SFC CSS (incl. AdminLayout's
        // admin.css) aggregates into the single `style.css` the consumers load.
        cssCodeSplit: false,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'PhlixUi',
            formats: ['es', 'cjs'],
            fileName: (format) => `phlix-ui.${format === 'es' ? 'js' : 'umd.cjs'}`,
            // Vite 8 names lib CSS after the package ("ui.css") by default; pin it
            // to style.css to keep the published `@phlix/ui/style.css` export stable.
            cssFileName: 'style',
        },
        rollupOptions: {
            // apexcharts is intentionally NOT external (UI-3.4 [U-B4]). Externalizing
            // it only removed the tiny static `import "apexcharts/core"` from the
            // vue3-apexcharts wrapper while the ~626 KB `apexcharts.ssr.esm-*` SSR
            // chunk still bundled — so apex double-shipped — AND it created a live
            // consumer dependency that survived only via npm transitive hoisting
            // (breaks under pnpm/isolated node_modules; the UI-3.3 consumer-risk
            // class). MetricsPage now imports `vue3-apexcharts/core` (browser build,
            // no SSR copy); bundling the ONE apex copy inside dist keeps @phlix/ui
            // self-contained — consumers do NOT need to provide apexcharts.
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
        // Keep the Playwright visual specs out of the Vitest run — `e2e/visual.spec.ts`
        // matches Vitest's default `**/*.spec.ts` glob and would throw if executed
        // outside the Playwright runner. (Run them with `npm run test:visual`.)
        exclude: [...configDefaults.exclude, 'e2e/**'],
        coverage: {
            provider: 'v8',
            // `lcov` is REQUIRED, not decorative: it is the only reporter here
            // that writes coverage/lcov.info, which is the file the Codacy
            // upload step in .github/workflows/ui-ci.yml sends. Dropping it
            // does not fail anything locally — the upload just silently
            // becomes a no-op, which is exactly how phlix-windows-client
            // reported coverage to nobody for months.
            reporter: ['text-summary', 'text', 'html', 'lcov'],
            // Measure the WHOLE src/ surface — never an allow-list.
            //
            // This used to be a hand-maintained allow-list that grew one entry
            // per surface as the R2–R5 redo rebuilt it. The list stopped being
            // maintained: by S139 it named 11 of the 45 files directly under
            // src/pages/, matched only *.vue under src/pages/admin/ (missing
            // helpLinks.ts), and had no entry at all for src/utils/,
            // src/directives/ or src/tokens/ — so 38 source files that DO have
            // a colocated *.test.ts were being
            // executed by the suite and then dropped from the report — including
            // all six src/pages/Music*.vue rebuilt by S110. Absent files read as
            // "not measured" but are trivially misread as "covered"; an
            // allow-list makes that the DEFAULT outcome for every new file.
            //
            // A whole-tree glob cannot rot: a new file is measured the moment it
            // is added, and a file with no tests shows up honestly as 0%.
            include: ['src/**/*.{ts,vue}'],
            exclude: [
                // Test code and its harness — never the subject of measurement.
                '**/*.test.ts',
                'src/test/**',
                'src/__tests__/**',
                // Dev-only playground / not shipped.
                'src/dev/**',
                'src/app/placeholder/**',
                // Ambient declarations: no emitted runtime, nothing to cover.
                'src/**/*.d.ts',
            ],
        },
    },
});
