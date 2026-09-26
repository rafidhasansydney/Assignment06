# FitLog

A dark, no-nonsense gym companion built with Next.js. Browse a library of twelve lifts, lock them into today's plan, save the ones you want to come back to, and watch the day's work add up.

The app lives in the `fitlog/` folder. `Requirements.md`, `UI/` and `assets/` are the assignment brief and design files it was built from.

**Live:** https://assignment06-ecru.vercel.app
**Repository:** https://github.com/rafidhasansydney/Assignment06

## Technologies

- **Next.js** (App Router) — pages, routing and rendering
- **TypeScript** — type-safe components and API data
- **Tailwind CSS** — styling, theming and responsive layout
- **lucide-react** — icon set used across the UI
- **FitLog API** — workout data (`https://api.api-store.workers.dev/api/fitlog`)

## Features

1. **Workout Library** — all twelve lifts in a responsive 3×4 grid with category tags, equipment, duration, calories and rating on every card
2. **Workout Details** — dedicated page with a large visual, a key-specs table (equipment, difficulty, sets, reps, duration, calories, rating) and step-by-step instructions
3. **Today's Plan** — add up to five lifts per day, with live counters in the navbar and the cap enforced on the button
4. **Saved List** — bookmark workouts for later and manage them in a separate tab
5. **Metrics Summary** — exercises, total minutes and total calories update live as the plan changes
6. **Sorting** — sort the plan or saved list by duration, calories or rating
7. **Mark as Done & Remove** — finish a lift or drop it, with a toast notification for every action
8. **Persistence** — plan and saved data survive page reloads via localStorage
9. **Responsive & complete** — works on mobile, tablet and desktop, with loading skeletons and a 404 page for unknown routes

## Getting Started

```bash
cd fitlog
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For a production build:

```bash
npm run build
npm start
```

## Project Structure

```
fitlog/
├── app/            pages (home, workout details, my plan, 404)
├── components/     navbar, footer, workout card
├── context/        plan/saved state and toast notifications
└── lib/            API helpers and shared types
```
