# Deployment Guide for Vercel

This project is structured as a monorepo with a **Django backend** and a **React (Vite) frontend**. Here's how to deploy it to Vercel.

## 1. Prerequisites

- A [Vercel](https://vercel.com) account.
- The project pushed to a GitHub/GitLab/Bitbucket repository.
- A production-ready database (e.g., [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), Supabase, or Railway). **SQLite is not supported for persistent data on Vercel.**

## 2. Vercel Configuration (`vercel.json`)

The `vercel.json` file in the root directory manages both the backend (as Serverless Functions) and the frontend (as static assets).

### Routing
- `/api/` ➔ Routed to Django backend.
- `/admin/` ➔ Routed to Django admin.
- `/static/` & `/media/` ➔ Routed to Django's static/media handlers (handled via WhiteNoise).
- Everywhere else ➔ Routed to React frontend.

## 3. Environment Variables

Set the following environment variables in the Vercel Project Settings:

### Backend (Django)
| Variable | Value |
| :--- | :--- |
| `SECRET_KEY` | A long random string. |
| `DEBUG` | `False` (mandatory for production). |
| `ALLOWED_HOSTS` | `.vercel.app` |
| `DATABASE_URL` | Your production database URL (e.g., `postgres://user:pass@host/db`). |

### Frontend (React/Vite)
| Variable | Value |
| :--- | :--- |
| `VITE_API_BASE_URL` | `/api/` (Use relative path for seamless backend communication). |

## 4. Database Setup

Vercel functions are stateless and read-only. You **cannot** use `db.sqlite3` for persistent data in production.
1. Create a PostgreSQL database (Vercel provides a free tier).
2. Add the `DATABASE_URL` environment variable.
3. The `build.sh` script in the `backend/` directory will automatically run migrations during the build process.

## 5. Steps to Deploy

1. Import your repository into Vercel.
2. In the **Project Settings**:
   - Ensure the **Framework Preset** is set to `Other` or `None` if it doesn't auto-detect the monorepo.
   - Set the root directory to the repo root (where `vercel.json` is).
3. Add the Environment Variables mentioned above.
4. Click **Deploy**.

## 6. Local Development

To run the project locally:
- **Backend:** `cd backend && venv\Scripts\activate && python manage.py runserver`
- **Frontend:** `cd frontend && npm run dev`
