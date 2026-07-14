# Changelog

All notable changes to this project are documented here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.2.0] - 2026-07-14

### Added

- Local-variable tag autocomplete (`B`/`I`/`D`/`R`/`S`/`P`/`BP`/`EX`) for instruction arguments in Text Mode, generated from the job's own parsed `//LVARS` counts
- Instruction-name autocomplete in Text Mode
- VAR/VALUE detail-edit fields for arithmetic instructions (`SET`/`ADD`/`SUB`/`MUL`/`DIV`/`AND`/`OR`/`NOT`)
- Condition File Edit dialog — open a real `IONAME.DAT`/`VARNAME.DAT`, browse and rename entries, save back to disk
- Warning toast when a job's folder is missing `ALL.PRM`, matching the original app's behavior
- Text Mode: freeform instruction-body editing, "Job all display" header preview, Check instruction/Compile validation with a click-to-jump Log viewer
- Inline line-edit bar docked at the bottom of the main window, replacing the earlier modal-based instruction commit flow
- Real `.JBI` file open/save through native OS dialogs, via an Electron IPC bridge

### Documentation

- README "Status" section documents deliberate format-fidelity scope boundaries: `ALL.PRM` contents, `//POS` position data, macro command definitions, and I/O tag-name autocomplete are all explicitly out of scope pending a verified spec, rather than silently unimplemented

## [0.1.0] - 2026-07-13

### Added

- Initial Electron + React + TypeScript scaffold recreating the JEDIT/YRC1000 ribbon UI
- Ribbon interface (Home / Settings tabs), job editor line list, and core dialogs (Find and Jump, Insert/Modify Instruction, Header of Job, Create Job, Modify Speed, Position Variable, Match Control Group, Display Setting, Select Language)
- Backstage menu (Create Job, Select Job, Save, Save As, Delete Job, Batch Change Folder Name, Print, Recent files)
- Custom hand-rolled SVG icon set replacing placeholder emoji throughout the ribbon, dialogs, and status bar
- Repo set up for public showcase: MIT license, README, CI build workflow
