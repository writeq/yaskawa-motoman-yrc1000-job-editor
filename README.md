# YRC1000 Job Editor

[![Build](https://github.com/writeq/yaskawa-motoman-yrc1000-job-editor/actions/workflows/build.yml/badge.svg)](https://github.com/writeq/yaskawa-motoman-yrc1000-job-editor/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A free, open-source desktop clone of the Yaskawa Motoman **JEDIT/YRC1000** job editor ribbon UI, built with **Electron + React + TypeScript**.

> **Unofficial, independent project.** This is a from-scratch recreation of the editor's user interface, written for interoperability and educational purposes. It is not affiliated with, endorsed by, or built from the source code of Yaskawa Electric Corporation. "YRC1000" and "Motoman" are trademarks of their respective owner.

![Main window](docs/screenshots/main-window.png)

## Features

- **Ribbon interface** (Home / Settings tabs) matching the original layout — Edit Mode, Edit, View, and Settings groups, with a custom SVG icon set
- **Job editor** line list (`NOP` / `DOUT` / `END`-style instructions) with line selection, edit-lock (`X0001`) and comment (`//`) marks
- **Inline line-edit bar** docked at the bottom of the main window (not a modal) for inserting/modifying an instruction, with an Edit button that drills into the structured field editor — mirrors the original app's interaction model
- **Text Mode** — freeform textarea editing of the instruction body (one instruction per line, `//` comments), autocomplete as you type — instruction names, and local-variable tags (`B`/`I`/`D`/`R`/`S`/`P`/`BP`/`EX`) generated from the job's own declared `//LVARS` counts — with ↑/↓ to navigate, Tab/Enter to accept, Esc to dismiss, an optional read-only header preview via "Job all display", and Check instruction/Compile syntax validation reported through a Log viewer panel with click-to-jump errors
- **Real `.JBI` file open/save** via native OS dialogs — reads and writes the job's name, comment, control group, date, and local variable counts, preserving the `//POS` block and any header lines it doesn't model yet so round-tripping a file never silently drops data
- **Backstage menu** — Create Job, Select Job, Save, Save As, Delete Job, Batch Change Folder Name, Print, Recent files
- **Dialogs**: Find and Jump, Insert/Modify Instruction (category → instruction → detail), Header of Job, Create Job, Modify Speed, Position Variable, Match Control Group → Select Group → Select, Display Setting (General/Color), Select Language
- **Condition File Edit** — open a real `IONAME.DAT`/`VARNAME.DAT` file, browse its number → name entries, rename one via a Character Edit sub-dialog, and save back to disk
- **Arithmetic instruction fields** — `SET`/`ADD`/`SUB`/`MUL`/`DIV`/`AND`/`OR`/`NOT` get a VAR/VALUE detail-edit form instead of inserting a bare instruction name

<p float="left">
  <img src="docs/screenshots/insert-instruction.png" width="49%" alt="Insert Instruction dialog" />
  <img src="docs/screenshots/position-variable.png" width="49%" alt="Position Variable dialog" />
</p>

## Status

The visual shell, editing flows, and real `.JBI` file I/O are in place. Still on the roadmap:

- [ ] `ALL.PRM` parameter file parsing — we only check that one exists next to the job (and warn if it doesn't, matching the original); its actual binary/text layout isn't publicly documented, so its contents (instruction sets, aliases, control group options, ...) aren't read

**Deliberately out of scope: I/O tag-name autocomplete.** Text Mode's variable-tag autocomplete only suggests local variable tags (`B000`, `BP001`, ...) because those counts come from the job's own `//LVARS` header — real, parsed data. Suggesting I/O signal *names* the way the original does would mean cross-referencing `IONAME.DAT` entries against IN/OUT sections we've deliberately not modeled (see Condition File Edit above), so we don't offer it.

**Deliberately out of scope: macro command definitions.** The `MACRO` instruction category is preserved and editable as free text, but what a given macro number actually does is defined in `ALL.PRM`, which — as above — we don't parse. Without a verified spec we won't invent a macro registry to populate that dropdown from.

Condition files are read as a flat, ordered list of `number  name` entries — the vendor's exact column layout and any IN/OUT or B/I/D/R/S/P/BP/EX type-sectioning convention within a single file isn't documented, so we don't guess at splitting entries into sections.

**Deliberately out of scope: editing the `//POS` block.** It holds the job's actual robot/base/station position data — the coordinates a real controller would move to. We preserve it byte-for-byte on load/save so nothing is lost, but we won't parse or expose it for editing without a verified spec for its layout: a subtly wrong field here doesn't just produce a broken file, it can drive a real robot to the wrong physical position. The Position Variable dialog stays a read-only mock display until that changes.

> The on-disk format support here is otherwise best-effort, reverse-engineered from the editor's own UI — it isn't verified against the vendor's exact byte-for-byte format. Back up real job files before saving over them.

## Tech stack

- [Electron](https://www.electronjs.org/) — desktop shell
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) + [vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron)
- Hand-rolled SVG icon set, no UI framework dependency

## Getting started

```bash
npm install
npm run dev      # Vite + Electron dev mode
```

Other scripts:

```bash
npm run build    # type-check + build renderer and electron bundles
npm run package  # build and package with electron-builder
npm run lint     # oxlint
```

## Project structure

```
electron/            main process + preload script
src/
  components/
    Ribbon/           ribbon tabs, groups, buttons, dropdown
    JobEditor/         line list + tabs
    TitleBar/          orb menu button + quick access
    StatusBar/
    Modal/             shared modal shell
    Toast/             save/open success/error notifications
    LineEditBar/        inline insert/modify instruction bar
    TextModeEditor/      freeform Text Mode textarea + gutter
    LogViewer/           Check instruction/Compile results
    dialogs/           every dialog (Find, Insert Instruction, Header, ...)
    icons/             the SVG icon set
  data/
    jbiFormat.ts        .JBI text parser/serializer
    jobFileIO.ts         open/save flows over the Electron bridge
    textMode.ts          Text Mode content <-> lines + syntax check
    conditionFile.ts     IONAME.DAT/VARNAME.DAT parser/serializer
    mockJob.ts, instructions.ts
  state/              reducer-based app store
  types/              job/header/instruction types, window.jobEditor bridge
```

## Contributing

Issues and PRs are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) for how to get set up and what to keep in mind (especially around the file-format scope boundaries above). Please also read the [Code of Conduct](CODE_OF_CONDUCT.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE)
