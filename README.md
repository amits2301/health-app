# HealthApp

HealthApp is a simple Angular application built as part of an Angular code test.
The application demonstrates authentication, protected routes, API integration, state management using Signal Store, and modern Angular (v21) best practices.

---

## 🛠 Tech Stack

- **Angular 21 (Standalone APIs)**
- **Angular Material** for UI components
- **RxJS** for async operations
- **NgRx Signals (Signal Store)** for state management
- **ngx-cookie-service** for authentication using cookies
- **Angular 21 Test Runner** for unit testing

---

## 🧩 Prerequisites

The project was developed and tested using the following versions:

```bash
Node.js: v25.1.0
npm:     v11.6.2
```

> ⚠️ Using the same or compatible versions is recommended to avoid dependency issues.

---

## 📦 Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install
```

---

### 2️⃣ Run development server

```bash
ng serve
```

Open your browser at:

```
http://localhost:4200
```

The application reloads automatically on source changes.

---

### 3️⃣ Run unit tests

```bash
ng test
```

All tests are written using modern Angular testing APIs (no deprecated testing modules or Jasmine globals).

---

### 4️⃣ Build the application

```bash
ng build
```

The production build artifacts are generated in the `dist/` directory.

---

## 🔐 Application Features

### Authentication

- Login using email and password
- Authentication token stored in **cookies**
- Protected routes using **functional route guards**
- Logout clears cookies and redirects to login

### Dashboard

- Displays a welcome message with the logged-in user’s email
- Provides navigation to the items list
- Logout option available

### Items List

- Fetches data from `/api/items`
- Uses **Signal Store** for state management
- Handles loading and error states
- Displays data using Angular Material components

---

## 🏗 Architecture & Approach

### Folder Structure (Feature-Based)

```
src/
 ├── app/
 │   ├── core/                # Core services, guards, interceptors
 │   ├── features/            # Feature modules (auth, dashboard, items)
 │   ├── app.routes.ts        # Application routes
 │   └── app.ts               # Root component
```

---

### Key Design Decisions

#### ✅ Standalone Components

- No NgModules
- Uses Angular’s latest standalone APIs for simplicity and performance

#### ✅ Feature-Based Architecture

- Each feature is self-contained
- Improves readability, scalability, and maintainability

#### ✅ State Management (Signal Store)

- Items list uses NgRx **Signal Store**
- Handles loading, success, and error states cleanly
- Avoids unnecessary global state

#### ✅ Authentication via Cookies

- Authentication token stored using `ngx-cookie-service`
- Guards protect dashboard and items routes
- Public routes are blocked for authenticated users

#### ✅ HTTP & Loading Handling

- HTTP calls managed through services
- Global loading state handled via interceptor + loading service
- Ability to skip loader using `HttpContext`

#### ✅ Modern Testing Strategy

- Uses Angular 21 test runner
- No deprecated APIs (`HttpClientTestingModule`, `RouterTestingModule`)
- No Jasmine globals (`spyOn`, `toContainEqual`)
- Functional guards tested with `runInInjectionContext`
- Tests focus on **behavior**, not UI internals

---

## 🧪 Unit Test Coverage

Unit tests are included for:

- Authentication service
- Route guards
- Login component
- Dashboard component
- Items service and Signal Store
- Layout and app bootstrap components

---

## 📝 Notes

- Mock APIs can be easily replaced with real backend services
- Environment-specific base URLs are managed via Angular environments
- The application is designed to be extendable and production-ready

---

## 📝Task Requirements Checklist

- Angular latest version

- Login with API integration

- Authentication using cookies

- Protected routes

- Dashboard with user info

- Items list with API integration

- Signal Store for state management

- Loading and error handling

- Unit tests

- README with setup & architecture explanation

---

## For login we can use below credentials
 - email :  amits@yopmail.com
 - password: Healthapp

## 👤 Author

**Amit Shahare**

---

### 🎯 Final Note

This project demonstrates clean architecture, modern Angular patterns, and best practices suitable for production-grade applications.
