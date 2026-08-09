# The Hitchhiker's Guide to the Galaxy — Web Edition

Douglas Adams and Steve Meretzky's 1984 interactive novel, presented in a
contemporary browser interface with the complete original story intact.

Inspired by [emollick/mind-forever-voyaging](https://github.com/emollick/mind-forever-voyaging),
a similar modern wrapper for Infocom's *A Mind Forever Voyaging*.

## What is preserved

- The canonical game is the original Z-machine story file for the Solid Gold
  Edition, version 5, serial 871119 (`nhitch.zip` in the source repository,
  vendored here as `public/hhgg-gold-s871119.z5`).
- The complete historical ZIL source is under `source/`, copied unmodified
  from [historicalsource/hitchhikersguide-gold](https://github.com/historicalsource/hitchhikersguide-gold).
- No prose, parser response, puzzle condition, or story branch has been
  rewritten. Every command reaches the original, unmodified interpreter.

## How it plays

The opening asks players to choose a control level:

- **Classic** keeps the command line and the story's own prompts, exactly as
  released in 1984.
- **Guided** adds a sidebar: clickable exits (only the directions the source
  actually defines for your current room), a "worth a look" list of objects
  the source places there, and one editable command box. Guided controls
  never move the player or act on their own — every click drafts or submits
  an ordinary parser command to the same unmodified interpreter and waits
  for it to respond.

## How the wrapper stays in sync

The canonical Z-machine interpreter (Parchment) is the sole authority. There
is no separate game-state model: `public/player-bridge.js` watches
Parchment's own transcript and status window inside an iframe and reports
the latest text to the React shell (`app/GuideEdition.tsx`) over
`postMessage`. The current room shown in Guided mode is read directly from
the interpreter's status line, matched against a room index.

That room/exit/object index (`app/world-data.ts`) is generated from the
preserved ZIL source by `scripts/extract-world.mjs` — it lists only the
exits and objects the original source actually defines for each room. It
does not encode puzzle logic, and it is regenerated automatically before
every build (`npm run world`).

## Local development

```bash
npm install
npm run dev
```

Build and export the static site:

```bash
npm run build
```

The output is written to `out/`. This project is set up to deploy to
Netlify via `netlify.toml`:

```bash
npx netlify-cli deploy --dir=out --prod
```

## Credits

*The Hitchhiker's Guide to the Galaxy* was written by Douglas Adams and
Steve Meretzky and published by Infocom in 1984. The historical source
archive comes from
[historicalsource/hitchhikersguide-gold](https://github.com/historicalsource/hitchhikersguide-gold).
The browser interpreter is [Parchment](https://github.com/curiousdannii/parchment),
maintained by Dannii Willis and contributors.

The original game, source, and package material retain their existing
copyright notices. See `THIRD_PARTY_NOTICES.md` for interpreter notices.
This is a non-commercial preservation and education project, not an
official release.
