# Historical Lovable build evidence

Original Lovable-managed preview, before GitHub Pages adaptation. Current deployment: docs/GITHUB-PAGES.md.

# Pixel Current — preview QA

## Scope and environment

Tested the running Vite preview at `http://localhost:8080` using Chromium Playwright on 2026-10-06. No production publishing, external-site changes, backend, auth, analytics or audio were involved. Automated harness build: OK. `bunx vitest run src/lib/pixel-game.test.ts`: 6/6 passing.

## Route and language matrix

All 16 combinations passed: `/`, `/play`, `/how-to`, `/about`, each in EN and ZH at 1440×900 and 390×844. Direct route entry worked; route titles were correct; document language was `en` or `zh-CN`. All rendered images loaded. Horizontal overflow: none. Page errors: zero. HTTP resources returning 400 or above: zero in the matrix run. See `docs/qa/results.json` for actual observations.

Language switching and reload/navigation persistence were checked. Read all eight route/language body-copy captures in context; reviewed desktop and mobile screenshots. Localized mode labels, timer units, hero-edge copy and home accessible label. Brand and font names remain proper names. Full self-hosted Noto Sans SC cmap check covers all 362 distinct CJK characters in frontend copy, with zero missing glyphs. Font-license links point to bundled notices.

## Real gameplay

- Pointer movement produced Explore bursts; challenge pointer collision increased score from 0 to 1. Arrow-key movement into an actual rendered target increased it to 2. Space also triggers a burst; the focus marker moves visibly, including in reduced-motion Explore.
- Touch-emulated mobile: tap produced an Explore burst; tapping a real target scored 1. DPR observed at 1.5 despite device scale factor 3. Touch `pointermove` collision additionally tested through a dispatched event and scored 1; native scrolling remains enabled. A real-device swipe is not independently verified.
- Exactly-once scoring, paused-state protection and countdown behavior are covered by the pure-state tests. Pointer target activation and assistive/keyboard click activation use distinct paths.
- Pause froze remaining time and stopped the effect RAF: 44467 ms before and after 500 ms, loops 0, frames unchanged at 40. Resume restarts from that remaining time.
- An actual 45-second session reached remaining 0, score 2; displayed “2 signals collected.” Retry reset score to 0 and remaining to approximately 45000 ms; Explore returned to idle, no score or timer. Best is in-memory only, retained on route navigation and cleared on reload.
- Reduced-motion target collection still scored. No extra bursts were generated. Reduced-motion Explore had loops 0; the static artwork and keyboard marker remained available. A lightweight gameplay RAF remains while the challenge runs to advance real time.

## Visibility and cleanup

The real headless tab/minimize attempt did **not** change `document.hidden` (it stayed false), so it is not evidence of native background-tab behavior. A separate explicitly synthetic `document.hidden=true` plus `visibilitychange` test exercised the implemented handler: remaining stayed at 44733 ms for 1000 ms, loops 0, frames unchanged at 23. Restoring visibility resumed to 44533 ms with loops 1. Native tab hiding still needs a headed/manual browser check; it is not reported as a passed native-tab test.

Scrolling the field out of viewport froze the countdown, frames and loop (258 frames before/after; loops 0). Returning resumes without counting hidden elapsed time.

Four home → detail → browser-back cycles were tested, through `/how-to`, `/about`, `/play`, `/about`. Explanatory routes had mounted 0 / loops 0; focused play had mounted 1 / loops 1; home returned to mounted 1 / loops 1 each time, never duplicated. A final reduced-motion play → about transition yielded mounted 0 / loops 0 and frames stayed at 64 after another 300 ms. Source cleanup cancels RAF, disconnects both observers, removes visibility/media listeners, clears particles and releases the burst callback. No effect timers or GSAP instances are created.

## Saved evidence

`docs/qa/` includes desktop hero, long-page overview, mobile hero, EN/ZH how-to details, desktop ZH, mobile ZH challenge, mobile reduced-motion, real challenge result, paused stage and static keyboard marker screenshots. `results.json` records the matrix/game/cycle run; `lifecycle-results.json` records final pause, synthetic-hidden, static-marker, touch-pointer and unmount checks.

## Remaining verification limits

Native headed background-tab transition, physical touch swipe, non-Chromium browsers and a formal screen-reader audit were not performed. No gameplay implementation gap is knowingly deferred; these are verification limits, not simulated passes.