# Todo App — CI/CD Test Project

A small Angular todo app used to exercise a GitHub Actions CI/CD pipeline.

## Stack

- Angular 22 (standalone, signals)
- Vitest for unit tests (`@angular/build:unit-test`)
- Prettier for formatting

## Local development

```bash
npm install
npm start            # dev server on http://localhost:4200
npm test             # run unit tests once
npm run build        # production build into dist/
npm run format       # apply Prettier
npm run format:check # verify formatting
```

## CI

`.github/workflows/ci.yml` runs on every push and pull request against `main`:

1. `npm ci`
2. `npm run format:check`
3. `npm test`
4. `npm run build`
5. upload `dist/` as a build artifact

## Features

- Add, toggle, and remove todos
- Clear completed todos
- Remaining count
- Persisted to `localStorage`
