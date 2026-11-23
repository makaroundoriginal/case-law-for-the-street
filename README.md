# Case Law for the Street — GitHub Pages deploy kit

Prepared 2026-11-14 by Glint (research stage), from the verified export at
`~/workspace/goals/case-law-for-the-street-app/files/case-law-for-the-street/case-law-for-the-street.html`.

## Why this folder exists

On Muse hosting, the offline saver file (sw.js) cannot sit at the app root —
Muse's packaging drops root files — so the "Saved for offline use" confirmation
never appears and a true airplane-mode reopen fails (diagnosed 2026-11-14).
Chris chose to move the app to a host that allows root files. This folder is
that move, pre-built: the only step left is Chris's GitHub account + upload.

## Files (upload all of them, exactly as named, to the repo root)

- `index.html` — the app (all 25 cards embedded). Only change from the export:
  the manifest link now points at the real `manifest.webmanifest` file instead
  of an embedded data copy. Verified: 25 card objects, 0 mailto links, 0 email
  strings, registers `sw.js` at root.
- `sw.js` — the offline service worker, extracted from the copy embedded in
  the page and rewritten for root placement (`../` paths → `./`). Syntax
  checked with node. Its CACHE_NAME (`case-law-street-v5-2026-11-14`) matches
  the page's APP_CACHE, and its precache list is: `./index.html`, `./`,
  `./manifest.webmanifest`, `./icon-192.png`, `./icon-512.png`,
  `./icon-maskable-512.png` — exactly the set the page's "Saved for offline
  use" check requires before it will show the confirmation.
- `manifest.webmanifest` — extracted from the embedded copy; `id`, `scope`,
  and `start_url` adjusted from `../` to `./` for root placement.
- `icon-192.png` (192×192), `icon-512.png` (512×512),
  `icon-maskable-512.png` (512×512) — extracted from the embedded copies,
  dimensions verified from the PNG headers.

## Upload steps (one sitting, ~10 minutes, Chris present)

1. Create the GitHub account in Chris's name — username `makaroundoriginal`
   was suggested; Chris picks it, sets his own password on GitHub's form, and
   supplies the emailed verification code.
2. Create a public repo named `case-law-for-the-street`.
3. Upload the 6 files above to the repo root (index.html, sw.js,
   manifest.webmanifest, and the three icons — not this README).
4. Settings → Pages → deploy from the main branch, root folder.
5. Expected address: `https://makaroundoriginal.github.io/case-law-for-the-street/`
   (domain changes if Chris picks a different username).

## Retest on Chris's Samsung (same test as before)

1. Open the new address in Chrome, tap "I understand" on the disclaimer.
2. The "✓ Saved for offline use on this device" line should now appear —
   the root sw.js can control the page and precache the full set.
3. Chrome ⋮ → Add to Home screen (icon should be the app's gold scales).
4. Airplane mode on → close fully → reopen from the home-screen icon →
   search "can I get the passenger out too" — Wilson should come up offline.

## After a verified retest

- The queued launch pieces (QR code, link as a comment under the Facebook
  announcement post, launch posts) must use the NEW GitHub address, never
  the Muse link.
- Nothing public points at the Muse link yet, so nothing gets stranded.
- The Muse-hosted copy can stay up as a fallback until the GitHub copy
  passes the airplane test; do not announce it as offline-capable.
