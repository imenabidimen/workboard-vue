# WorkBoard

A Vue 3 task workspace for keeping a personal list of work simple: add something, see what is still open, and mark it done.

The frontend talks to the TaskForge API and uses bearer-token authentication.

## Stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Vitest

## What I built

- Sign in and account creation
- Protected workspace
- Create and complete tasks
- Open / completed / total counters
- Loading, empty and error states
- Responsive layout
- API error handling and expired-session handling

## Run locally

Start TaskForge API on `http://localhost:3000/api`, then:

```bash
npm install
npm run dev
```

Tests and production build:

```bash
npm test
npm run build
```

## Screenshots

These are browser captures from the application running against the API and PostgreSQL database in GitHub Actions.

### Sign in
![WorkBoard sign in](docs/screenshots/01-sign-in.png)

### Create an account
![WorkBoard sign up](docs/screenshots/02-sign-up.png)

### Add a task
![WorkBoard task created](docs/screenshots/03-task-created.png)

### Complete a task
![WorkBoard task completed](docs/screenshots/04-task-completed.png)

## Why Vue?

WorkBoard is the Vue implementation of this small task workflow. ClientHub implements the same backend contract in React, with a different UI and use case.
