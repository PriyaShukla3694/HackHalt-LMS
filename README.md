# HackHalt LMS (Learning Management System)

HackHalt LMS is a modern, responsive, and secure React + Vite learning management system frontend designed for professional educational workflows. It supports distinct dashboards and routing controls for three key roles: **Students**, **Instructors**, and **Administrators**.

---

## 🚀 Key Features

### 1. Security & Route Protection
- **Role-Based Redirects**: Guards routes using the `ProtectedRoute` wrapper. Unauthenticated visits redirect to `/login`, while unauthorized roles are cross-redirected back to their role-appropriate dashboards.
- **Synchronized Auth State**: Restores authentication details synchronously from local storage during app initialization to prevent unauthenticated layout flashes.

### 2. Consolidated Design System
- **Unified Design Tokens (`theme.css`)**: Leverages shared variables for brand oranges, neutral inks, borders, radii, shadows, and status styles.
- **Reusable Component Library**:
  - `Button`: Supports primary, secondary, ghost, and danger variants with loading states, sizes, and icons.
  - `CourseCard`: Flexible container support for dashboard catalog views and detail panels.
  - `StatCard`: Visual summary cards with custom icons.
  - `PlatformTour`: Interactive spotlight walkthrough for student onboarding.

### 3. UX Polish & Interactions
- **Form Validations**: Built client-side inline validation (email formats, password strength checks, confirm-password matches) for forms across LoginPage, RegisterPage, ForgotPasswordPage, and all settings panels.
- **Skeleton Pulse Loading**: Fully replaces text loading indicators with Framer Motion animated skeletons matching grid layouts.
- **Empty States**: Generic component layouts with illustrations/icons and relevant CTAs when data lists are empty.
- **Toast Notifications**: Context-driven alert panel with slide-in animation. Intercepts fetch calls in `authFetch` using a standalone event emitter to broadcast server/network errors globally.

---

## 🛠️ Technology Stack
- **Framework**: React 19 (Functional Components + Hooks)
- **Bundler**: Vite
- **Styling**: Vanilla CSS (Consolidated Variables + Responsive Layouts)
- **Icons**: React Icons (Fi, Fc)
- **Animations**: Framer Motion
- **Utilities**: jsPDF (local certificate generation)

---

## 📁 Project Structure

```bash
HackHalt/
├── src/
│   ├── assets/         # Images, badges, and logo resources
│   ├── components/     # Reusable UI controls (Button, CourseCard, Skeleton, EmptyState, etc.)
│   ├── context/        # React Contexts (AuthContext, ToastContext)
│   ├── hooks/          # React custom hooks
│   ├── pages/          # Student, Instructor, and Admin dashboards/settings
│   ├── routes/         # ProtectedRoute routing guards
│   ├── styles/         # theme.css tokens and component styles
│   └── utils/          # api.js fetch interceptors & mockMode.js registry
```

---

## 💻 Running the App Locally

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed.

### 2. Installation
Install the project dependencies:
```bash
npm install
```

### 3. Run Development Server
Launch the local development environment:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 4. Build for Production
Bundle the project for production deployment:
```bash
npm run build
```

---

## ⚙️ Mock Mode Integration
The project runs with a toggleable `MOCK_MODE` inside `src/utils/mockMode.js` (currently `true`). When active:
- Login accepts any credentials and generates a session.
- Enrollment, course progression, modules tracking, and certificates operate completely offline via `localStorage` data stores.
- Setting it to `false` automatically switches data communication back to your live API backend endpoints.
