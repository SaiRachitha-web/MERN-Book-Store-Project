# PageTurn — Book Store Management System (standalone MERN export)

This is a portable, plain-JavaScript MERN version of the Book Store app, meant
to be opened and run in VS Code (or any editor) outside of Replit. It is a
snapshot export — it does not sync with the live Replit project.

## Structure

```
mern-book-store/
├── client/   React + Vite frontend (JavaScript, React Router, Axios)
└── server/   Express + MongoDB backend (plain JavaScript)
```

## Prerequisites

- Node.js 18+
- A MongoDB connection string (e.g. from MongoDB Atlas)

## 1. Set up the server

```bash
cd server
npm install
```

Edit `server/.env` and fill in:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_string
```

The file also includes `PORT`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` — change
`ADMIN_EMAIL`/`ADMIN_PASSWORD` to whatever you want your admin login to be.

Start the server:

```bash
npm start        # production
npm run dev      # auto-restarts on file changes (requires nodemon, included)
```

The server seeds 12 sample books automatically the first time it connects to
an empty database. The API runs at `http://localhost:5000/api` by default.

## 2. Set up the client

```bash
cd client
npm install
```

Copy `.env.example` to `.env` (already done in this export) and adjust the
API URL if your server runs somewhere other than `http://localhost:5000/api`:

```
VITE_API_URL=http://localhost:5000/api
```

Start the client:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## Features

- Public catalog with search and category filtering
- Book detail pages
- Admin login (JWT-based) and protected dashboard
- Full CRUD for books from the admin dashboard

## Notes on this conversion

This export was rewritten from the original Replit TypeScript project:
- TypeScript → plain JavaScript (`.tsx`/`.ts` → `.jsx`/`.js`)
- Wouter routing → `react-router-dom`
- Generated Orval API client / React Query → plain Axios calls with small
  custom hooks (`src/hooks/useBooks.js`)
- Workspace-only packages (`@workspace/...`) removed; the auth token is now
  wired directly through an Axios request interceptor
  (`src/api/client.js`)

