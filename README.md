# WorkBoard

![CI](https://github.com/imenabidimen/workboard-vue/actions/workflows/ci.yml/badge.svg)

WorkBoard is the Vue 3 version of a small personal task list. A user signs in, adds a task, and marks it complete. It uses the shared [TaskForge API](https://github.com/imenabidimen/taskforge-api) for accounts and saved task data; the browser does not keep a separate mock task store.

[ClientHub](https://github.com/imenabidimen/clienthub-react) uses the same API from a React interface, but is aimed at reviewing a list of deliverables with search, status filters and a progress summary. WorkBoard stays focused on the basic task flow.

## Stack

- Vue 3, TypeScript and Vite
- Vue Router
- Vitest and Vue Test Utils
- TaskForge API (NestJS, PostgreSQL)

## What you can do

- Create an account and sign in
- Open the workspace behind a route guard
- Add a task and mark it complete
- See open, completed and total task counts
- Get loading, empty and API-error feedback
- Recover from an expired session instead of staying in a broken signed-in state

## Run locally

Start [TaskForge API](https://github.com/imenabidimen/taskforge-api) first, with its API available at `http://localhost:3000/api`. Then run:

```bash
npm ci
npm run dev
```

If the API runs at a different address, copy `.env.example` to `.env.local` and set `VITE_API_URL` to the API base URL, including `/api`. Vite reads `.env.local` when starting the dev server.

```bash
npm test
npm run build
```

## Screenshots

These images are captured by the CI browser test while WorkBoard is running against TaskForge and PostgreSQL.

### Sign in
![WorkBoard sign in](docs/screenshots/01-sign-in.png)

### Create an account
![WorkBoard sign up](docs/screenshots/02-sign-up.png)

### Add a task
![WorkBoard task created](docs/screenshots/03-task-created.png)

### Complete a task
![WorkBoard task completed](docs/screenshots/04-task-completed.png)

## One behavior worth checking

When the API rejects a completion request, WorkBoard should not cross the task off locally or show a false success. The page keeps the task open and reports the error, because the server is the source of truth. There is a regression test for this case.

The point of this project is a small, easy-to-follow Vue implementation of authentication and task updates. It deliberately does not add a second domain model or duplicate the backend rules already enforced by TaskForge.
