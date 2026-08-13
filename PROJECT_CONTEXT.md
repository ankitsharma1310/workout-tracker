# Workout Tracker — Project Context

## Current Version

v1.0.0

## Purpose

Personal workout tracker for daily gym use.
Primary platform: iPhone.
Also works as an installable PWA on Android.

## Core philosophy

Keep the app simple and fast.
Do NOT add feature bloat.
Prioritize:

- Fast workout logging
- Searchable exercise library
- Weight/reps entry
- Previous performance
- Rest timer
- History
- Bodyweight tracking
- Mobile UX

## Current stack

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Zustand
- React Router
- Vite PWA
- Vercel

## Deployment

Production is deployed through Vercel.
GitHub repository:
https://github.com/ankitsharma1310/workout-tracker.git

Production branch:
main

## Current app sections

- Home
- Workout
- History
- Workout Detail
- Bodyweight
- Settings

## Workout functionality

- Start workout
- Resume unfinished workout
- Add exercises
- Search exercise library
- Favorites
- Muscle-group filtering
- Log weight
- Log reps
- Complete sets
- Delete sets
- Delete exercises
- Automatic current-workout persistence
- Previous performance display
- Repeat previous workout
- Rest timer
- Workout completion summary

## Bodyweight

- Daily bodyweight logging
- One entry per day
- 7-day average
- Height setting
- kg/lb conversion
- Recent entries

## Mobile UI

The application is designed primarily for iPhone.
Important UX principles:

- Large touch targets
- Safe-area support
- Compact workout screen
- Numeric keyboard for weight/reps
- Sticky workout controls
- Full-screen exercise picker
- Bottom navigation

## Exercise library

Approximately 100 exercises across:

- Chest
- Back
- Shoulders
- Biceps
- Triceps
- Forearms
- Legs
- Glutes
- Core
- Cardio

## Important architecture

Exercise library items are templates:

- name
- muscleGroup
- equipment

Actual workout exercises contain:

- id
- name
- muscleGroup
- sets

Workout sets contain:

- id
- weight
- reps
- completed

## Persistence

localStorage is used for:

- current workout
- workout history
- settings
- favorites
- bodyweight

## Version 1.0 status

The app is considered feature-complete for personal use.
Future development should focus on real-world usability and polishing rather than adding lots of new features.

## Version 2.0

Not started yet.
Build from the existing v1.0 architecture.
Do not assume features that are not listed above exist.

## Developer

Built by Ankit Sharma.

## Development workflow

Build:
`npm run build`

Production changes:
`git add .`
`git commit -m "..."`
`git push origin main`

Vercel automatically deploys main.

## Important instruction for future AI

Before modifying code:

1. Inspect the relevant existing file.
2. Do not guess the current architecture.
3. Prefer complete safe replacements for complex JSX rather than fragile regex edits.
4. Keep the app mobile-first.
5. Avoid unnecessary features unless explicitly requested.
6. Preserve existing functionality.
