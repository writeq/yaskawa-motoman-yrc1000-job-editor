# YRC1000 Job Editor

A free, open-source desktop clone of the Yaskawa Motoman JEDIT/YRC1000 job editor ribbon UI, built with Electron + React + TypeScript.

Currently implemented as a UI shell with mock job data:

- Ribbon (Home / Settings tabs) matching the original layout: Edit Mode, Edit, View, Settings groups
- Job editor line list (NOP / DOUT / END style instructions) with selection, edit-lock and comment marks
- Backstage menu (Create Job, Save, recent files, ...)
- Dialogs: Find and Jump, Insert Instruction (category → instruction → detail), Modify Instruction (Detail Edit), Header of Job, Create Job, Modify Speed, Position variable, Match Controlgroup / Select Group / Select, Display Setting (General/Color), Select Language

Not yet implemented: reading/writing real `.JBI` files, condition file editing, compile/check instruction, printing.

## Development

```bash
npm install
npm run dev      # Vite + Electron dev mode
npm run build    # type-check + build renderer and electron bundles
npm run package  # build and package with electron-builder
```
