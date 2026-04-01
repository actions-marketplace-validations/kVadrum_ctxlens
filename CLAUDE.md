# ctxlens

## Purpose
CLI tool that scans a codebase, tokenizes every file, and reports how the project maps to AI model context windows. Like `du` for tokens.

## Status
v0.1.0 — core scanning and reporting.

## Stack
- TypeScript (ESM, Node 18+)
- Commander.js — CLI framework
- @dqbd/tiktoken — tokenization (WASM)
- chalk — terminal output
- ignore — .gitignore parsing
- esbuild — bundler
- vitest — testing
- tsx — dev runner

## Structure
```
src/
  cli/          # Command definitions (Commander.js)
    index.ts    # Entry point, command registration
    scan.ts     # scan command
    models.ts   # models command
  core/
    scanner.ts  # File discovery, .gitignore handling
    tokenizer.ts # Tokenization engine (wraps tiktoken)
    models.ts   # Model registry (context windows, tokenizer mappings)
    budget.ts   # Budget calculation logic
  output/
    terminal.ts # Rich terminal rendering
    json.ts     # JSON output
models/
  registry.json # All supported models (data, not code)
```

## Commands
- `npm run dev` — run via tsx (no build needed)
- `npm run build` — bundle with esbuild
- `npm test` — run vitest
- `npm run lint` — type-check with tsc

## Conventions
- Model definitions live in `models/registry.json`, not in code
- Tokenizer is abstracted behind `core/tokenizer.ts` for future swapping
- Scanner respects .gitignore by default + built-in ignore list for binaries/artifacts
