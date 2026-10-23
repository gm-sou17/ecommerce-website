# E-Commerce MERN App

A full-stack e-commerce application with a React frontend and an Express, Node.js, and MongoDB backend.

## Project structure

```text
MERN/
|-- backend/     Express API, MongoDB models, routes, and controllers
|-- frontend/    React application and static assets
|-- .gitignore   Shared rules for secrets and generated files
|-- README.md    Project setup and usage
```

## Requirements

- Node.js and npm
- A MongoDB connection string
- ImageKit API keys for image uploads

## Configure and run the backend

In PowerShell, from the `MERN` directory:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Edit `backend/.env` with your MongoDB URI, a private token secret, and ImageKit keys. Keep this file local; it is ignored by Git. Start the API:

```powershell
npm run dev
```

The backend listens on port `8080` by default. `FRONTEND_URL` should match the frontend's origin (usually `http://localhost:3000` during development). `PORT` can be set to use another backend port.

## Configure and run the frontend

Open another PowerShell window in the `MERN` directory:

```powershell
cd frontend
npm install
npm start
```

The frontend opens at `http://localhost:3000` and uses the backend at `http://localhost:8080`.

## Git and sensitive files

Commit application source, public assets, `package.json`, and `package-lock.json`. Do not commit `.env` files, `node_modules`, build output, or local logs; the root `.gitignore` excludes them. The safe `backend/.env.example` documents the required backend settings without containing credentials.

Before pushing, review `git status` and confirm that no real credentials or `.env` files are listed.
