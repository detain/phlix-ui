# Caliber Learnings

Accumulated patterns and anti-patterns from development sessions.
Auto-managed by [caliber](https://github.com/caliber-ai-org/ai-setup) — do not edit manually.

- **[pattern]** `npm run build` runs the full chain: `vue-tsc --noEmit` (typecheck) → `vite build` → `vue-tsc --declaration --emitDeclarationOnly` (d.ts) → `copy-fonts.mjs`. The build OVERWRITES `dist/` and `dist/` is committed to git — always rebuild and stage `dist/` as part of a version bump, or consumers get stale bundles.
- **[pattern]** Typecheck alone with `npx vue-tsc --noEmit` (returns 0 on success); run the full suite with `npx vitest run`. Run an affected subset by passing file paths, e.g. `npx vitest run src/components/virtual-grid.test.ts`.
- **[convention]** The consumer `phlix-server/web-ui/package.json` pins `@phlix/ui` by git tag (`"github:detain/phlix-ui#vX.Y.Z"`), NOT by npm version. A release is incomplete until you: bump `package.json` version → update CHANGELOG → rebuild+commit `dist/` → merge → `git tag -a vX.Y.Z <commit> -m ...` → `git push origin vX.Y.Z` → bump the `#vX.Y.Z` ref in the consumer's package.json. Skipping the tag/consumer-bump means the new UI never ships.
- **[pattern]** Release/merge flow in this repo: branch → commit → `git pull --all` → `git push -u origin <branch>` → `gh pr create` → `gh pr merge --squash --delete-branch` → `git checkout master && git pull`.
- **[env]** Prefix git/gh shell blocks with `unset GITHUB_TOKEN` — pushes use the SSH remote (`git@github.com:detain/...`) and a stale `GITHUB_TOKEN` interferes. Commit scripts also probe `command -v caliber` and run `caliber refresh --quiet` before staging.
- **[convention]** DOM-free windowing/paging math lives in `src/components/virtual-grid.ts` as pure exported functions (e.g. `computeWindow`, `effectiveItemCount`, `shouldLoadMore`) and is unit-tested directly in `virtual-grid.test.ts` — jsdom has no layout, so `MediaGrid.vue` only measures and delegates the arithmetic. Add new grid logic as a pure helper there with its own test rather than testing through the component.
