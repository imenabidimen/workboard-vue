# WorkBoard

WorkBoard is a Vue 3 task list. Sign in, add work, and mark tasks complete. It uses the TaskForge API for authentication and persistence.

## Stack

- Vue 3, TypeScript and Vite
- Vue Router
- Vitest and Vue Test Utils
- TaskForge API (NestJS, PostgreSQL)

## Current features

- Account creation and sign-in
- A route guard for the workspace
- Create tasks and mark them complete
- Open, completed and total counters
- Loading, empty and error states
- Responsive layout and expired-session handling

## Run locally

Start [TaskForge API](https://github.com/imenabidimen/taskforge-api) first, with its API available at `http://localhost:3000/api`. Then run:

```bash
npm install
npm run dev
```

If the API is running elsewhere, set `VITE_API_URL` to its base URL, including `/api`.

```bash
npm test
npm run build
```

## Screenshots

The screenshots below are browser captures from the CI workflow, which runs the frontend against TaskForge and PostgreSQL.

### Sign in
![WorkBoard sign in](docs/screenshots/01-sign-in.png)

### Create an account
![WorkBoard sign up](docs/screenshots/02-sign-up.png)

### Add a task
![WorkBoard task created](docs/screenshots/03-task-created.png)

### Complete a task
![WorkBoard task completed](docs/screenshots/04-task-completed.png)

## Implementation note

WorkBoard keeps the task workflow deliberately small. Task ownership and persistence live in the API; the frontend sends a bearer token and displays the returned task state.