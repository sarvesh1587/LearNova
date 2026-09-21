# What changed vs. your uploaded frontend

Verified with a real `npm run build` — 253 modules, zero errors.

## Fixed files
- `src/context/AppContext.jsx` — now fetches real data from your backend
  (`GET /api/courses`, `GET /api/enrollments/:userId`) instead of dummy
  data, maps backend field names to what your components already expect,
  integrates Clerk (`useUser`), adds `enrollInCourse` and
  `updateLectureProgress`.
- `src/pages/student/Coursedetails.jsx` — Enroll button now actually
  calls the backend; "Already Enrolled" reflects real state; video
  preview uses the fixed YouTube-ID extractor; educator name is dynamic
  (was hardcoded).
- `src/pages/student/Player.jsx` — fixed YouTube ID extraction (old code
  broke on `youtube.com/watch?v=...` links, only worked for `youtu.be`);
  lectures are now clickable to mark complete/incomplete, which persists
  via the backend.
- `src/pages/student/MyEnrollments.jsx` — replaced 14 hardcoded fake
  progress rows with real completed-lecture counts per course.
- `src/components/student/CourseCard.jsx` — was hardcoding "Sarvesh" as
  the educator name on every card regardless of the actual course. Now
  shows the real educator.
- `src/components/student/educator/Navbar.jsx` — had
  `const { user } = useUser;` (missing the `()` call), so `user` was
  always `undefined`. Fixed to `useUser()`.
- `.env` — added `VITE_BACKEND_URL=http://localhost:5000`.
- `package.json` — added `axios` dependency.

## New file
- `src/utils/youtube.js` — shared helper that correctly extracts a video
  ID from both `youtu.be/...` and `youtube.com/watch?v=...` links.

## Unchanged (already correct)
Hero, SearchBar, Navbar (student), CoursesSection, Companies,
TestimonialsSection, CalltoAction, Footer, CoursesList, Home, App.jsx,
main.jsx, assets.js, Loading.jsx.

## Still stub/placeholder — not built in this pass
- `pages/educator/AddCourse.jsx`, `Dashboard.jsx`, `MyCourses.jsx`,
  `StudentsEnrolled.jsx` — empty shells, no real UI or backend wiring.
- `components/student/educator/Sidebar.jsx`, `Footer.jsx` — empty files
  (0 bytes), so there's no educator layout beyond the top navbar.
- `isEducator` in AppContext never becomes `true` — no "become educator"
  flow exists yet.
- `components/student/Rating.jsx` and `components/student/wheelz-loading.jsx`
  are unused dead code (not referenced by any route) — left as-is,
  harmless.

Backend's `POST /api/courses` works but nothing on the frontend calls it
yet. Say the word and I'll build out the educator side next.

## Setup
```
npm install
```
Make sure your `.env` has:
```
VITE_CLERK_PUBLISHABLE_KEY=your_key
VITE_CURRENCY='$'
VITE_BACKEND_URL=http://localhost:5000
```
Run the backend (`npm start` in `server/`) and then:
```
npm run dev
```
