# Pixel Current — artwork round two

## Scope and source authority

Completed in this Lovable project for owner review on 2026-10-07. No publishing, external repository writes, new routes, package/version changes, backend, audio, analytics or duplicate effect systems. Original source authority: `Pachin1919/pixel-collision-motion-preview`, commit `3d0d5452fd9b63a3c204ee2c0e2096392304ea81`. Owner-provided current downstream reference: `3d04ff9d9fe09afc7cdc07cf1c26c9addfd8903a` at https://pachin1919.github.io/pixel-collision-motion-preview/. These are distinct references; round two does not assert that it changed the downstream site.

The original `public/assets/pixel-current.png` (1672×941), first playable screen, native Canvas lifecycle, game rules and four content routes remain incumbent. No original image was recolored or cropped for the new asset count.

## Three new portable raster plates

| Actual path | Native dimensions | Composition / generation direction |
|---|---|---|
| `public/assets/round2-cross-current.png` | 1536×768 | Wide cyan/cobalt pixel cross-current curling around an open dark eddy, coral interruptions. |
| `public/assets/round2-signal-fragments.png` | 1024×1024 | Tighter coral-square islands and fragments, sparse cyan marks, blue-black negative space. |
| `public/assets/round2-interference.png` | 768×1280 | Vertical staggered/interwoven cyan and blue pixel columns with small coral seams. |

**Provenance:** three separate native image-generation calls using the `standard` quality tier in this round. Prompts were guided by the supplied signal-world brief and existing artwork/palette; these are newly generated compositions, not edited source pixels or game screenshots. No text, characters, scores or interface were requested or baked into these images. Initial generation output was JPEG; Pillow converted those exact native-resolution outputs to optimized lossless PNG without cropping, resizing or repainting. PNG prevents further lossy encoding but does not retroactively remove JPEG artifacts. Generated JPEG intermediates were removed. Pixel edges were inspected at the rendered plate sizes. These are artwork stills, not additional engines.

All three assets are actual repository binaries, not CDN pointers, screenshot placeholders or platform-only URLs. Their exact byte sizes and SHA-256 values are recorded in `.export/art-round2/manifest.json`. Original artwork and existing fonts/license notices remain portable. **Cropped derivatives: none.** Screenshots under `docs/qa/art-round2/` are QA evidence, never app artwork.

## Chapter composition map

### `/` — five below-fold structures

1. **Input manual:** full-width pale ice-blue band; readable dark text, three practical gesture diagrams. Pointer path meets an outlined coral target; touch has a large tap target; WASD geometry moves toward a square. Mobile stacks instructions without hiding text.
2. **Cross-current:** dark full-width panorama with a quiet heading and narrow caption; native 2:1 plate remains uncropped.
3. **Signal atlas:** asymmetric editorial layout, larger square fragment study versus narrow vertical interference, concise separate captions and an offset margin note. On mobile the square spans the width; portrait and note share a staggered row.
4. **Mode decision:** unequal unframed sections. Quiet Explore links to focused `/play`; Challenge gives the real 45-second duration prominent coral emphasis and starts the existing challenge above, rather than navigating to a duplicate engine. Rules remain a separate real `/how-to` link.
5. **Workshop ending:** compact horizontal credit/readback strip, not a giant empty heading or card; links to `/about`.

### `/how-to` — four lower structures

1. Ice-blue practical input manual.
2. Dense scoring ledger with four unchanged rules, one-point geometry and an inset square signal-fragment plate, clearly distinguished from a live target.
3. Wide cross-current interlude, constrained to the reading page rather than an artificial card.
4. Quiet reduced-motion reading note and real `/play` action.

### `/about` — four lower structures plus return

1. Wide original-art figure with original-source caption.
2. Pale reading band: original composition, interaction and accessibility/process explanation; factual copy retained.
3. Asymmetric new-study atlas, large square versus staggered vertical study.
4. Dense unframed credits ledger: separately identifies new generated studies, original artwork/source, interaction, typography/licenses and owner authorization.
5. Short play-return ending.

### `/play`

Focused incumbent gameplay remains unchanged; no editorial plates or duplicate lower engines added. The request to keep the focused route intact takes precedence over adding artificial chapters to it.

## Localization, fonts and accessibility

All new headings, captions, actions and descriptive alt text have natural EN/ZH equivalents. New images use lazy loading, async decoding and explicit native dimensions to reserve their ratio. Language persistence verified on both reload and navigation. All eight route/language rendered body-copy captures were read in context. Proper names/font names remain proper names.

Current project uses a **full self-hosted Noto Sans SC**, not an Ink/page-only Chinese subset. FontTools cmap inspection: **406 distinct CJK characters** in frontend TSX, **30,890 mapped glyphs**, **zero missing characters**. Thus regenerating an Ink subset is not applicable here and no font binary was changed or exported. Existing OFL notices preserved. The temporary Brotli decoder used for inspection was installed outside the project; no npm or project dependencies changed.

Existing keyboard marker, Tab focus, touch input, reduced-motion static play and bounded Canvas particles/DPR retained. New raster plates have no animations or effects requiring lifecycle cleanup. No scroll hijacking added.

## Actual bounded QA

One initial batched inspection, then one confirmation batch, using Chromium Playwright at localhost. Every combination of four routes × EN/ZH × 1440×900 / 390×844 was directly opened and scrolled through. **16/16: correct document language, all rendered images loaded, no horizontal overflow, no page errors, no HTTP resources ≥400.** Individual titles and route metadata remained app-specific. First-pass overview stitching exposed smooth-scroll timing in the evidence script, not duplicated app sections; confirmation used instant scroll and cropped the last overlapping viewport. Final overview evidence does not contain duplicate chapters.

The confirmation exercised the new lower Challenge action through the real field: session started, real target activation scored 1, Pause froze remaining time, Resume worked, keyboard marker visible, Explore returned, reduced-motion flag true. In touch emulation a native touchscreen tap on a live target increased the existing score to 2. Synthetic hidden-state tests froze the remaining time in both sizes. Navigation to About left mounted engines 0 / active loops 0. Chinese language survived reload and navigation. Internal link destinations in the new chapters are the existing `/play`, `/how-to`, `/about`; direct entry to each passed.

Pure scoring tests: `bunx vitest run src/lib/pixel-game.test.ts`, **6/6 passing** (45,000ms session, exactly-once scoring and pause/expiration protections). Latest automatic preview build reported **build OK** at 2026-10-07T03:16:51Z. No automatic lint or manual build run was used.

Evidence: `docs/qa/art-round2/results.json`, `font-coverage.json`, all 16 `<width>-<language>-<route>-overview.jpg` images, and desktop/mobile `manual.png`, `atlas.png`, `decisions.png`, `interlude.png`. Overviews are stitched actual viewport screenshots; section captures are real element screenshots. None are shown as application art.

**Limits:** native headed background-tab hiding (synthetic only this round), physical-device swipes, non-Chromium browsers and formal screen-reader audit not performed. The complete 45-second end/result and four return cycles were exercised in the prior QA (`QA.md`), not repeated as new round-two passes. No externally published Pages adapter was changed or tested. No claimed live users, achievements or leaderboard.

## Safe text-only binary export

At the end of the round, `.export/art-round2/manifest.json` lists **only the three newly generated application image binaries** with `path`, `size`, `sha256`, and ordered `chunk_paths`. Unchanged original artwork, fonts, generated build output and QA documentation images are excluded. Exact complete bytes are base64-encoded into UTF-8 ASCII files under `.export/art-round2/chunks/`, at most 32,000 characters per chunk and every split divisible by four. Concatenating each ordered chunk list and base64-decoding reproduces the binary; local decode/byte/hash roundtrip verified for all three. Export resides outside `public`, is never imported, and is not part of the app's public asset serving. Owner can retrieve chunks through text-only `read_file` before exporting/publishing themselves.