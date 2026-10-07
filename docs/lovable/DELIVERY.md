# Historical Lovable build evidence

Original Lovable-managed preview, before GitHub Pages adaptation. Current deployment: docs/GITHUB-PAGES.md.

# Pixel Current — review delivery

## Source authority

- Original owner-supplied PACHIN pixel-collision demo, verified against `https://github.com/Pachin1919/pixel-collision-motion-preview`.
- Pinned source commit: `3d0d5452fd9b63a3c204ee2c0e2096392304ea81`.
- Artwork SHA-256: `917c14fe8b7079da488238a92e21e63f9812e292ae6ba5de157f66ecfe1e2f4e`. Delivered `public/assets/pixel-current.png` is byte-identical to supplied source artwork.
- Resulting implementation commit observed after final gameplay changes: `faaca1770846991c979925ee5c29d38506ee2e78`. This is the actual implementation snapshot, not a fabricated final hash. Documentation/evidence added afterward are checkpointed by Lovable automatically; their later final checkpoint is not yet observable from this document. No manual git commit/push was performed.

## Implemented routes

- `/`: original artwork-led interactive introduction, Explore and real 45-second Challenge, below-fold input diagrams and mode explanations.
- `/play`: focused stage, full gameplay, accessible controls and return navigation.
- `/how-to`: pointer/touch/keyboard instructions, actual scoring, pause/visibility rules and reduced-motion guidance.
- `/about`: process, artwork provenance, source credits and font-license links.

EN/ZH switching persists across navigation and reload within the tab. Scores are real collisions; the best score is session-only and reset on reload. Native Canvas adapts the original seeded drift and capped radial bursts; original imagery stays center/cover-aligned, not redrawn or filtered. Reduced motion preserves a static playable view. All new behavior is frontend-only.

## Portable assets and licensing

All runtime media/font assets are actual portable binaries under `public/assets`, not Lovable asset pointers or remote downloads. Original source HTML/CSS/JS, assets and GSAP vendor file are preserved under `public/assets/source/`; GSAP is retained as source reference, not used by the native Canvas runtime.

Barlow Condensed and IBM Plex Sans WOFF2 files and their supplied OFL notices are preserved. Full Noto Sans SC variable font was downloaded from the Google Fonts `ofl/notosanssc` source and losslessly encoded as WOFF2 (approximately 7.5 MB), with its OFL notice retained. It covers all new Chinese copy, not merely an original page-specific subset. No new generated/stock images were used. PACHIN artwork is included under the owner's authorization for this expansion, not relicensed for general reuse.

## QA and review

See `QA.md` and `docs/qa/` for actual route, resource, collision, completion, pause, reduced-motion and cleanup evidence, including desktop/mobile and EN/ZH screenshots. Native background-tab hiding could not be induced by headless Chromium; the visibility handler was tested synthetically and this distinction is recorded. Physical swipe, cross-browser and formal screen-reader checks remain unverified. The full CJK font prioritizes portable text coverage over download size.

Delivery is the completed independent Lovable preview for review. Production has not been published; the owner's existing PACHIN personal project and GitHub repositories were not changed or pushed to.