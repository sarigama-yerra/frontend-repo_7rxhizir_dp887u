# Fitness Tracker Web App - Build Notes

## What was built

A simple, clean fitness tracker where you can:
- Log workouts with date, type, duration, calories, and notes
- Record body measurements (weight, body fat %, resting heart rate)
- See a dashboard with totals and recent history

The app is responsive, fast, and designed with a modern dark UI.

## Tools used

- project-list: to inspect existing folders/files before changes
- project-read: to review current backend and frontend code
- project-write: to create and update all backend and frontend files
- project-run: to install dependencies and start both servers
- project-get-url: to provide a live preview link

## Design choices

- Dark, muted color palette with subtle gradients for a focused, modern feel that’s easy on the eyes during evening use.
- Clear information hierarchy: small stat cards on top, then two scrollable panels for recent workouts and body metrics.
- Simple, compact forms with sensible defaults (today’s date, common workout types) for quick entry.
- Optimistic UX: immediate list refresh by reloading after submissions to keep implementation straightforward and reliable.
- Accessibility considerations: high contrast text on dark backgrounds, large touch targets, semantic structure.

## Libraries and frameworks

- Frontend: React (Vite) + Tailwind CSS for rapid, utility-first styling.
- Backend: FastAPI for a lightweight, high-performance API service.
- Database: MongoDB via PyMongo (connection provided by the environment). Pydantic is used to validate data models.

No extra charting or icon libraries were added to keep the interface minimal and fast.

## Data model

Collections defined using Pydantic:
- workout: date, type (Cardio/Strength/HIIT/Yoga/Pilates/Sports/Other), duration_min, calories?, notes?
- metric: date, weight_kg?, body_fat_pct?, resting_hr?

These are stored in MongoDB with automatic created_at/updated_at timestamps.

## API endpoints

- GET /           → Health message
- GET /test       → Backend + database connectivity report
- POST /api/workouts → Create a workout
- GET  /api/workouts  → List workouts
- POST /api/metrics  → Create a metric
- GET  /api/metrics   → List metrics

## Environment

- Frontend uses VITE_BACKEND_URL to call the API. If not set, defaults to http://localhost:8000 in development.

## Future enhancements

- Edit/delete items
- Charts for trends (weight, weekly volume)
- Authentication and per-user data
- Inline validations and optimistic updates without reloads
