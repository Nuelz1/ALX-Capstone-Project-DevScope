# DevScope — Project Context

> **Purpose of this file:** This is the working source of truth for project mentoring and future implementation. Read it before proposing changes. Keep the distinction between **implemented**, **planned**, and **deferred** work explicit, and update this document when the architecture or scope changes.

## 1. Project overview

**DevScope** is a React web application that lets someone search for a GitHub username and inspect a developer's public profile and repositories in one analytics-oriented dashboard. It is intended to help developers and recruiters review public GitHub information without manually opening every repository.

- **Repository:** https://github.com/Nuelz1/ALX-Capstone-Project-DevScope
- **Active working branch:** `devscope-refinement`
- **Production deployment:** https://alx-capstone-project-dev-scope.vercel.app/
- **Current stack:** React 19, JavaScript, Vite, React Router, Tailwind CSS v4, Vercel serverless functions, GitHub REST API.
- **Product direction:** a cohesive, responsive **dark analytics dashboard**.
- **Motion direction:** purposeful, subtle animations. Framer Motion is a selected future addition; it is **not currently listed as a dependency** in `package.json`.

## 2. Current product scope

### Implemented

- Search for a GitHub user by username.
- Trim whitespace and show an inline validation message for an empty search.
- Navigate to a profile route at `/user/:username`.
- Fetch public GitHub user information and repository data through server-side API routes.
- Show avatar, name/login, bio, followers, following, public repository count, and available location/company/blog/Twitter details.
- Link to the user's GitHub profile.
- Show account creation month/year.
- Calculate total repository stars, most-used repository language, and top-starred repository.
- Sort repositories by stars, forks, or most recently updated.
- Filter repositories by programming language.
- Display repository name, description (when available), stars, forks, language (when available), and last-updated date.
- Show loading and request error states, including user-not-found, rate-limit, network, and server/upstream failures.
- Route unmatched paths to a not-found page.

### Not yet implemented / planned

- Full end-to-end UI/UX redesign across Home, profile dashboard, repository list, navigation, loading/error/empty states, and responsive layouts.
- Consistent design tokens and shared component styling for the dark analytics direction.
- Purposeful, subtle Framer Motion transitions after the dependency is deliberately added.
- Further engineering improvements that are agreed during refinement; do not expand scope without explaining the value and trade-offs first.

## 3. Architecture and data flow

### Routes

Defined in `src/App.jsx`:

- `/` → `src/pages/Home.jsx`
- `/user/:username` → `src/pages/UserProfile.jsx`
- `*` → `src/pages/NotFound.jsx`

Routes are wrapped in `src/components/UI/Layout.jsx`, which renders the shared `Navbar` and React Router's `Outlet`.

### GitHub data flow

1. `SearchBar.jsx` validates the entered username and navigates to the profile route.
2. `UserProfile.jsx` reads `username` from `useParams()`.
3. `useGithubUser.js` calls `fetchGithubUser()`; `useUserRepos.js` calls `fetchUserRepos()`.
4. Both functions are defined in `src/services/githubService.js`.
5. The service calls the same-origin Vercel API endpoints:
   - `/api/github/user?username=...`
   - `/api/github/repos?username=...`
6. The serverless handlers in `api/github/user.js` and `api/github/repos.js` call the GitHub REST API using the server-side `GITHUB_TOKEN` environment variable.
7. The hooks expose data, loading state, and user-facing error messages to `UserProfile.jsx`.

**Security decision:** Do not put a GitHub token in a `VITE_*` variable or expose it to browser code. The old README setup instruction for `VITE_GITHUB_TOKEN` is outdated and must be corrected.

### Analytics

`src/utils/analytics.js` contains the repository-analysis functions:

- `getTotalStars(repos)`
- `getMostUsedLanguage(repos)`
- `getTopStarredRepo(repos)`
- `sortRepositories(repos, criteria)`
- `getUniqueLanguages(repos)`

**Separation of concerns:** `analytics.js` implements the analysis logic. `UserProfile.jsx` calls those helpers, manages page-level sort/filter state, and renders the dashboard. Do not relocate analytics calculations into UI components as part of styling work.

## 4. Component inventory and usage

### Used in the current route flow

- `src/components/SearchBar.jsx` — search form, empty-input validation, route navigation.
- `src/components/UI/Input.jsx` — reusable input styles and accessibility attributes.
- `src/components/UI/Button.jsx` — shared button variants and sizes.
- `src/components/UI/Layout.jsx` — shared app shell.
- `src/components/UI/Navbar.jsx` — brand navigation, rendered by Layout.
- `src/components/UI/Spinner.jsx` — loading UI.
- `src/components/UI/ErrorMessage.jsx` — request error UI.
- `src/components/LanguageFilter.jsx` — language filter buttons.
- `src/components/RepoList.jsx` — renders repository results.
- `src/pages/Home.jsx`, `src/pages/UserProfile.jsx`, `src/pages/NotFound.jsx` — route pages.

### Exists but is not part of the current main route flow

- `src/components/UserCard.jsx` — displays a GitHub user's avatar, login, and public repository count.
- `src/components/UserList.jsx` — maps a list of users to UserCard components.
  
The current app is a **single-user search/profile flow**, not a multi-user search-results flow. Do not assume UserCard/UserList are used by the profile dashboard; the profile sidebar is currently rendered directly in `UserProfile.jsx`.

### Known cleanup / audit items

- `src/components/UI/Card.jsx` and `src/hooks/useSearchUsers.js` were empty placeholders in the previously inspected repository tree. Re-check before using or removing them.
- `src/App.jsx` imports `Navbar` directly even though Layout renders it; the import appears unused.
- `UserProfile.jsx` contains temporary `console.log` statements for `sortBy` and `selectedLanguage`.
- `README.md` still instructs users to create `VITE_GITHUB_TOKEN`, which conflicts with the current server-side API architecture.
- An ESLint `process is not defined` issue in the serverless API files was intentionally deferred. Do not derail the current UI/UX work to address it unless it blocks a required check or the user asks.

## 5. Current UI baseline

The current styling already uses many slate surfaces and indigo accents, but it is not yet a fully consistent design system.

- `Layout.jsx` establishes a slate-950 page background and a max-width container.
- `Home.jsx` contains a centered hero/search area and four feature cards.
- `UserProfile.jsx` currently renders the profile sidebar, analytics summary cards, sort controls, language filter, and repository list directly in page JSX.
- `Navbar.jsx` still contains a white/dark mixed Tailwind class set and a different inner max width from Layout.
- The profile page repeats some outer background/width/padding responsibilities already present in Layout.
- Shared Input, Button, SearchBar, and UserCard received a recent styling/accessibility refinement on `devscope-refinement`.

For the redesign, preserve existing data behavior and error handling while improving hierarchy, spacing, responsiveness, accessibility, and consistency. Extract new components only where doing so clarifies responsibilities and supports reuse; do not split components just for the sake of splitting them.

## 6. Technical decisions and constraints

- Use the existing Vite + React + React Router structure; this is not a Next.js project.
- Use Tailwind CSS v4 through the existing Vite integration.
- Keep GitHub credentials on the server side in `GITHUB_TOKEN`.
- Keep repository calculations in `src/utils/analytics.js`.
- Keep API requests in `src/services/githubService.js` and request lifecycle/error mapping in the custom hooks unless there is a clear reason to refactor.
- The project currently has no charting library and no Framer Motion dependency. Do not assume either is installed.
- Avoid replacing working behavior with mock data or redesigning only the search form while leaving the dashboard inconsistent.
- Explain the purpose of meaningful code changes before giving implementation steps. Prefer fundamentals-first walkthroughs over unexplained copy/paste.

## 7. Agreed design direction

**Visual direction A — Dark analytics dashboard**

- Dark slate/near-black foundation.
- Clear, high-contrast analytics cards and repository surfaces.
- Indigo as the primary interaction accent, with restrained semantic colors.
- Consistent spacing, typography, borders, focus states, and responsive behavior.
- Purposeful, subtle animations rather than motion for decoration.
- The developer's profile and repository data remain the center of the experience.

## 8. Suggested refinement sequence

1. **Baseline and consistency:** keep the current working branch synchronized; identify shared design primitives and remove obvious temporary debug output when appropriate.
2. **App shell and Home:** unify navbar/container widths, global background, hero hierarchy, and responsive search experience.
3. **Profile dashboard:** refine profile summary, analytics cards, section hierarchy, and responsive grid.
4. **Repository controls and results:** improve sort/filter active states, repository metadata layout, and empty states.
5. **Loading and errors:** design consistent loading, missing-user, rate-limit, network, and upstream-error experiences.
6. **Motion:** add Framer Motion intentionally, then apply small transitions to meaningful state changes.
7. **Verification:** run the app, test representative users and error/empty states, run build/lint where practical, inspect the responsive layout, and push each coherent milestone.

Reorder these steps if repository inspection or testing reveals a dependency; update this file when decisions change.

## 9. Working agreement for future sessions

Before proposing a change:

1. Check this file and inspect the current branch version of the relevant files.
2. State whether the change is fixing a defect, refining existing UX, or adding new scope.
3. Preserve the current working features unless the user explicitly agrees to change them.
4. Explain important React/API/accessibility concepts in plain language.
5. Give commands for the actual repository and branch; do not assume a local change has been committed or deployed.
6. After a feature milestone, remind the user to test and push.
7. Update this file when implementation status, architecture, or agreed direction changes.

**Status rule:** If something has not been verified in code or tested, label it as unverified rather than calling it complete.
