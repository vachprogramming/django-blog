<p align="center">
  <h1 align="center">📚Blog</h1>
  <p align="center">
    A full-stack blog application with user authentication, post management, commenting, search, and pagination. Built to demonstrate core web application features and clean CRUD workflows..
  </p>
</p>

---

## ✨ Features

-   **🔐 Secure Authentication:** User registration and login with Google OAuth integration.
-   **🏫 Blog Posts (CRUD):** Create, read, update, and delete posts.
-   **🏫 Search:** Simple search to find the relevant post

---

## 🛠️ Tech Stack

This project is built with a modern, robust technology stack:

| Layer        | Technology                                                                 |
| :----------- | :------------------------------------------------------------------------- |
| **Frontend** | [React](https://react.dev/) (v19), [Vite](https://vitejs.dev/), [React Router](https://reactrouter.com/) |
| **Styling**  | [Tailwind CSS](https://tailwindcss.com/)                                   |
| **Backend**  | [Django](https://www.djangoproject.com/) (v5.2), [Django REST Framework](https://www.django-rest-framework.org/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/)                                  |
| **Auth**     | Google OAuth 2.0 via `@react-oauth/google`                                 |

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

-   **Python 3.10+**
-   **Node.js 18+** and **npm**
-   **PostgreSQL** (running locally or via Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/StudyConnect.git
cd StudyConnect
```

### 2. Backend Setup

Navigate to the backend directory and set up the virtual environment.

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv

# On Windows (PowerShell)
.\venv\Scripts\Activate.ps1
# On macOS/Linux
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Configure Environment Variables:**

Create a `.env` file in the `backend/` directory by copying the example below. Fill in your database credentials and a secret key.

```env
# backend/.env

SECRET_KEY='your-super-secret-django-key'
DEBUG=True

# Database Configuration
DATABASE_URL=postgres://YOUR_USER:YOUR_PASSWORD@localhost:5432/studyconnect_db

# Google OAuth (get your credentials from Google Cloud Console)
GOOGLE_CLIENT_ID='your-google-client-id.apps.googleusercontent.com'
```

**Run Migrations & Start the Server:**

```bash
python manage.py migrate
python manage.py runserver
```
The backend API will be available at `http://127.0.0.1:8000`.

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies.

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```
StudyConnect/
├── backend/                # Django REST API
│   ├── api/                # Core application logic (models, views, serializers)
│   ├── core/               # Django project settings
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/               # React + Vite SPA
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── context/        # React Context for global state (Auth)
│   │   ├── pages/          # Page-level components (Home, Login, Profile)
│   │   └── main.jsx        # Application entry point
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```


