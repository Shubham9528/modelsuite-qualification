# Task Pipeline

A full-stack task management system for talent onboarding workflows. Built with the MERN stack.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS v4 + custom CSS |
| Backend | Node.js + Express 4 |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| File Uploads | Multer |

---

## Project Structure

```
modelsuite-qualification/
├── client/                  # React (Vite) frontend
│   └── src/
│       ├── api/             # Axios API helper modules
│       ├── components/
│       │   ├── admin/       # Admin-specific UI components
│       │   └── talent/      # Talent-specific UI components
│       ├── context/         # AuthContext (JWT auth state)
│       └── pages/
│           ├── admin/       # Admin dashboard pages
│           └── talent/      # Talent dashboard pages
└── server/                  # Express backend
    ├── config/              # MongoDB connection
    ├── controllers/         # Route handler logic
    ├── middleware/          # JWT auth + file upload middleware
    ├── models/              # Mongoose schemas
    ├── routes/              # Express route definitions
    ├── scripts/             # Database seed script
    └── uploads/             # Local file storage for submissions
```

---

## Prerequisites

- **Node.js** v18 or higher — [nodejs.org](https://nodejs.org)
- **MongoDB** running locally on port 27017, **or** a MongoDB Atlas connection string
- **npm** (comes with Node.js)
- **Git**

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/modelsuite-ai/modelsuite-qualification.git
cd modelsuite-qualification
```

### 2. Configure the backend

```bash
cd server
cp .env.example .env
```

Open `server/.env` and fill in your values:

```env
MONGO_URI=mongodb://localhost:27017/task-pipeline
JWT_SECRET=your-random-secret-string-here
PORT=5000
```

> Use a long random string for `JWT_SECRET`. You can generate one with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### 3. Install backend dependencies

```bash
# You should be in the /server directory
npm install
```

### 4. Seed the database

This creates 1 Admin user, 2 Talent users, and 5 sample tasks.

```bash
npm run seed
```

**Seed credentials:**

| Role | Email | Password |
|---|---|---|
| Admin | `admin@test.com` | `password123` |
| Talent | `talent1@test.com` | `password123` |
| Talent | `talent2@test.com` | `password123` |

### 5. Install frontend dependencies

```bash
cd ../client
npm install
```

---

## Running the Application

You need **two terminals open simultaneously**.

**Terminal 1 — Start the backend server**
```bash
cd server
npm run dev
```
The API will be available at `http://localhost:5000`

**Terminal 2 — Start the frontend**
```bash
cd client
npm run dev
```
The app will open at `http://localhost:5173`

---

## User Roles & Flows

### Admin
- Log in at `/login`
- **Dashboard** (`/admin/dashboard`) — view task stats and manage all tasks
- **Tasks** (`/admin/tasks`) — same as dashboard (create, edit, delete tasks, assign to talents)
- **Submissions** (`/admin/submissions`) — review talent submissions, approve or reject

### Talent
- Log in at `/login` or register at `/register`
- **Dashboard** (`/talent/dashboard`) — browse available (Open) tasks and claim one
- Claimed tasks appear in **My Tasks** section with a Submit button
- Submit a task by uploading a file and adding notes

---

## API Reference

### Auth

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT token |

### Admin — Tasks

| Method | Route | Description |
|---|---|---|
| GET | `/api/tasks` | List all tasks (with populated assignedTo) |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Admin — Users

| Method | Route | Description |
|---|---|---|
| GET | `/api/users/talents` | List all Talent-role users |

### Talent — Tasks

| Method | Route | Description |
|---|---|---|
| GET | `/api/talent/tasks/available` | Get all Open tasks |
| GET | `/api/talent/tasks/mine` | Get tasks assigned to the logged-in talent |
| PUT | `/api/talent/tasks/:id/claim` | Claim an open task |

### Submissions

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/submissions/:taskId` | Auth | Submit a task with optional file |
| GET | `/api/submissions/:taskId` | Auth | Get submission for a specific task |
| GET | `/api/submissions/admin/all` | Admin | Get all submissions |
| PUT | `/api/submissions/:id/review` | Admin | Set reviewStatus to Approved or Rejected |

---

## Available Scripts

### Server (`/server`)

| Command | Description |
|---|---|
| `npm run dev` | Start server with nodemon (auto-reloads on change) |
| `npm start` | Start server with node (no auto-reload) |
| `npm run seed` | Seed the database with sample data |

### Client (`/client`)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

---

## Troubleshooting

**"MongooseError: connect ECONNREFUSED"**
→ MongoDB is not running. Start it with `mongod` or use a MongoDB Atlas URI in `MONGO_URI`.

**"JsonWebTokenError: invalid signature"**
→ `JWT_SECRET` in your `.env` doesn't match the one used to sign existing tokens. Re-run `npm run seed` or clear localStorage in your browser.

**Port already in use**
→ Change `PORT` in `server/.env`. The Vite dev server port can be changed in `client/vite.config.js`.

**Upload files not saving**
→ The `server/uploads/` directory must be writable. It is tracked in git via `.gitkeep` — ensure it exists.

---

## Contribution

- raise a PR for the particular issue assigned to you and then go to issue and link your PR there to get it reviewed
