# WorkBoard

A Vue 3 operations workspace for people who need to keep a short list of work moving. It is intentionally practical rather than a dashboard full of fake charts.

Stack: Vue 3, TypeScript, Vite, Vue Router, Vitest.

## What it demonstrates

- Protected login flow
- API boundary for the NestJS TaskForge backend
- Task creation and completion
- Loading, empty, and error states
- Responsive, low-friction UI
- Component test coverage for the login experience
- CI build verification

## Product decisions

The UI favors useful states over decoration: a clear primary action, readable task status, and feedback when the API is unavailable. The frontend does not duplicate business rules that belong on the backend.

## Run locally

npm install
npm run dev
npm test
npm run build

Set VITE_API_URL when the API is not running at http://localhost:3000/api.

## API contract

The app expects the TaskForge endpoints for login and task management. This makes it possible to run the frontend against the NestJS repository without coupling the two codebases together.