# YRC1000 Job Editor

A free, open-source desktop clone of the Yaskawa Motoman **JEDIT/YRC1000** job editor ribbon UI, built with **Electron + React + TypeScript**.

> **Unofficial, independent project.** This is a from-scratch recreation of the editor's user interface, written for interoperability and educational purposes. It is not affiliated with, endorsed by, or built from the source code of Yaskawa Electric Corporation. "YRC1000" and "Motoman" are trademarks of their respective owner.

![Main window](docs/screenshots/main-window.png)

## Features

- **Ribbon interface** (Home / Settings tabs) matching the original layout — Edit Mode, Edit, View, and Settings groups, with a custom SVG icon set
- **Job editor** line list (`NOP` / `DOUT` / `END`-style instructions) with line selection, edit-lock (`X0001`) and comment (`//`) marks
- **Backstage menu** — Create Job, Save, Save As, Delete Job, Batch Change Folder Name, Print, Recent files
- **Dialogs**: Find and Jump, Insert/Modify Instruction (category → instruction → detail), Header of Job, Create Job, Modify Speed, Position Variable, Match Control Group → Select Group → Select, Display Setting (General/Color), Select Language

<p float="left">
  <img src="docs/screenshots/insert-instruction.png" width="49%" alt="Insert Instruction dialog" />
  <img src="docs/screenshots/position-variable.png" width="49%" alt="Position Variable dialog" />
</p>

## Status

This is a UI-first build backed by mock job data — the visual shell and editing flows are in place, but a few things are still on the roadmap:

- [ ] Read/write real `.JBI` job files and `ALL.PRM` parameter files
- [ ] Text Mode (freeform Notepad-style editing with autocomplete and syntax check)
- [ ] Inline line-edit box docked in the main window (currently a modal)
- [ ] Condition file editing (`IONAME.DAT` / `VARNAME.DAT`), macro commands, expression editor

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
    dialogs/           every dialog (Find, Insert Instruction, Header, ...)
    icons/             the SVG icon set
  data/               mock job + instruction definitions
  state/              reducer-based app store
  types/              job/header/instruction types
```

## License

[MIT](LICENSE)
