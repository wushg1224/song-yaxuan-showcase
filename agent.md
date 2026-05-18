# Agent Guide

## Project Summary

This is a static fan-style showcase page for `宋亚轩 / Song Yaxuan`. It is a single-page website with a moonlight blue-silver visual direction, bilingual Chinese/English copy, a horizontal hero image, a gallery grid, a short profile section, and an official Weibo link.

The project intentionally avoids build tooling, package managers, backend APIs, and framework dependencies. Open `index.html` directly in a browser to preview the page.

## Files And Structure

- `index.html`: page structure, content, image references, and the small missing-image fallback script.
- `styles.css`: all layout, responsive behavior, typography, color, and image-frame styling.
- `README.md`: user-facing preview and image naming notes.
- `assets/images/`: local image assets used by the page.

Current image conventions:

- `assets/images/hero-landscape.png`: horizontal hero image used in the first screen.
- `assets/images/gallery-01.png` to `assets/images/gallery-12.png`: gallery image slots.
- Missing gallery images are expected and should keep showing placeholders until the user adds more images.

## Design Direction

Keep the page quiet, poetic, and visual-first:

- Use the existing moonlight blue, silver white, deep navy, and pale gray palette.
- Keep the first viewport clearly branded around `宋亚轩 / Song Yaxuan`.
- Preserve the bilingual tone: Chinese primary, English supporting.
- Avoid adding unverified facts, rankings, slogans, awards, or latest-news claims.
- Avoid marketing-site clutter; this should feel like a fan visual showcase, not a commercial landing page.

The user has already asked to make the main title smaller and to use a horizontal hero image. Preserve those preferences unless they explicitly request otherwise.

## Implementation Notes

- Keep this as plain HTML/CSS unless the user asks for a framework.
- Use relative asset paths so direct file opening continues to work.
- Do not remove the missing-image fallback behavior in `index.html`; it makes empty gallery slots look intentional.
- The hero image frame uses `.landscape` with `aspect-ratio: 16 / 9`.
- Gallery tiles use CSS grid with `.tall` and `.wide` modifiers. When adding or replacing images, prefer changing image files over changing layout markup.
- Use ASCII in code and documentation unless existing Chinese page copy requires Chinese text.

## Verification Checklist

After edits, check:

- `index.html` opens without a build step.
- The hero image loads from `assets/images/hero-landscape.png`.
- Missing gallery slots still show placeholders rather than broken image icons.
- Desktop and mobile widths have no horizontal overflow.
- The hero title, navigation, buttons, and bilingual copy do not overlap or overflow.
- External links use `target="_blank"` and `rel="noreferrer"`.

For browser verification in this environment, a local server may be needed because direct `file://` browser automation can be blocked. A temporary command such as `python3 -m http.server 4173` from the project root is sufficient.
