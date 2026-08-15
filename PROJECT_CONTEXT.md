# Workout Tracker — Project Context

## Current Version

v2.0.0

## Purpose

Personal workout tracker for daily gym use.
Primary platform: iPhone.
Also works as an installable PWA on Android.

## Core philosophy

Keep the app simple and fast. Do NOT add feature bloat. Prioritize fast workout logging, exercise library, sets/weight/reps, previous performance, rest timer, history, body tracking, and mobile UX.

## Current stack

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Zustand
- React Router
- Vite PWA
- Vercel

## Current app sections

- Home
- Workout
- History
- Workout Detail
- Body
- Settings

## Workout functionality

- Start/resume workout
- Add/search exercises
- Favorites and muscle-group filtering
- Log weight/reps and complete sets
- Delete sets/exercises
- Automatic current-workout persistence
- Previous performance
- Repeat previous workout
- Rest timer
- Workout completion summary
- Automatic exercise collapse so the active exercise stays open while other exercises collapse

## History and export

- Completed workout history
- Delete individual workouts with confirmation
- Workout detail view
- Print-friendly full workout export through the browser PDF/print flow
- PDF includes workout name/date, duration, exercise list, sets, weight, reps, completion status, notes, and volume

## Body

- Daily bodyweight logging
- One entry per day
- 7-day average
- Height stored in the Body section rather than Settings
- Optional dated body measurements
- Common measurements: chest, biceps, forearms, waist, shoulders, thighs, calves, neck, hips
- cm/in measurement entry and display
- Recent bodyweight entries

## Settings

- Default rest timer
- Weight unit
- Auto-start rest timer

## Persistence

localStorage is used for:

- current workout
- workout history
- settings
- favorites
- bodyweight
- body profile and measurements

Existing height stored in the old settings record is automatically migrated into the new Body profile when Body is opened.

## Mobile UI

The application is designed primarily for iPhone with large touch targets, safe-area support, compact workout screen, numeric keyboard for weight/reps, sticky workout controls, full-screen exercise picker, and bottom navigation.

## Development workflow

Build: `npm run build`
Production changes are deployed from `main` through Vercel.

## Important instruction for future AI

Before modifying code:
1. Inspect the relevant existing file.
2. Do not guess the current architecture.
3. Prefer complete safe replacements for complex JSX rather than fragile regex edits.
4. Keep the app mobile-first.
5. Avoid unnecessary features unless explicitly requested.
6. Preserve existing functionality.
