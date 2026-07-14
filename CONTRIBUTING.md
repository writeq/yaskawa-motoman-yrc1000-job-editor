# Contributing

Thanks for considering a contribution to YRC1000 Job Editor.

## Ground rules

- This is an unofficial, independent recreation of the JEDIT/YRC1000 UI, built for interoperability and educational purposes. It is not affiliated with Yaskawa Electric Corporation. Contributions should keep to that spirit: reproduce documented or observable UI/format behavior, don't invent undocumented vendor internals (see the "Deliberately out of scope" notes in the [README](README.md#status) for examples of where we've drawn that line — `ALL.PRM` contents, `//POS` position data, macro definitions).
- Real `.JBI`/condition files can belong to production robot cells. Any change touching file parsing/serialization should be round-trip safe: opening and re-saving a file you didn't modify must not alter bytes it doesn't understand.

## Getting set up

```bash
npm install
npm run dev      # Vite + Electron dev mode
```

Before opening a PR:

```bash
npm run lint
npm run build
```

Both must pass — CI runs the same checks on every push and PR.

## Making changes

- Keep PRs focused; unrelated formatting/refactor changes make review harder.
- Match the existing code style (no comments unless they explain a non-obvious *why*; see the file headers in `src/data/*.ts` for the tone we're going for).
- If you add a feature that touches the on-disk file formats, update the README's Features/Status sections in the same PR.
- UI changes should be checked against the reference screenshots where possible — the goal is visual and behavioral fidelity to the original ribbon UI.

## Reporting bugs / requesting features

Please use the issue templates — they ask for the context that's usually needed to act on a report (repro steps, OS, whether a real job file is involved).

## License

By contributing, you agree your contributions are licensed under the project's [MIT License](LICENSE).
