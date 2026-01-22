# Career Connect – Internship & Job Portal

## 📋 Project Overview

Career Connect is a frontend job and internship portal that connects students with companies. The platform enables students to search and apply for jobs while allowing companies to post job openings and manage applicants. Built with vanilla JavaScript, HTML, and CSS.

Important: This repository now includes a built-in local data store that uses the browser's `localStorage` instead of requiring JSON Server. The project still contains legacy `Frontend/data/*.json` files (kept for reference) but application data is seeded and managed by `Frontend/javascript/dataStore.js` and persisted in `localStorage`.

## ✨ Key Features

### For Students
- **User Registration & Login**: Secure authentication system
- **Job Browsing**: View all available job listings
- **Smart Recommendations**: Get job recommendations based on CGPA and skills matching
- **Job Search**: Search jobs by title, skills, or location
- **Apply to Jobs**: One-click job application system
- **Application Tracking**: View all applied jobs with status
- **Profile Management**: Edit profile details (skills, city, CGPA, degree, resume link)

### For Companies
- **Company Registration & Login**: Company account management
- **Post Jobs**: Create and publish job openings with requirements
- **Manage Jobs**: View all posted jobs in one place
- **View Applicants**: See all applicants for each job posting
- **Student Profiles**: View detailed student profiles
- **Profile Management**: Edit company information

## 🛠️ Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling and responsive design
- **JavaScript (Vanilla)**: All functionality and interactivity
- **Bootstrap 5**: Responsive framework and UI components
- **Font Awesome**: Icons
-- **localStorage API**: Client-side session management (primary data store now)
-- **dataStore.js**: localStorage-backed helper exposing async-like functions (`getStudents`, `createJob`, etc.) used by `script.js`

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher) installed on your system
- npm (comes with Node.js)
- A modern web browser (Chrome, Firefox, Edge, Safari)
- VS Code with Live Server extension (recommended)

### Running the Project Locally (recommended)

You can run the frontend without installing or running JSON Server. The project will use the built-in `dataStore.js` (localStorage-backed) to seed and persist data.

Option A — Quick (no server required):

1. Open `Frontend/index.html` with Live Server (VS Code) or any local static file server.

Option B — Using Python simple server:

```bash
cd Frontend
python -m http.server 8000
```

Open `http://localhost:8000` in your browser.

Notes:
- The app will seed example data into `localStorage` the first time it runs (via `dataStore.js`).
- If you prefer the original JSON Server workflow, it is still possible — see the legacy instructions below.

### Step 4: Verify Setup

- Check that JSON Server is running (you should see "Watching..." in the terminal)
- Open browser console (F12) to check for any errors
- Try logging in with test credentials (see below)

## 📁 Project Structure

```
Career Connect-Intership and Job Frontend Project/
│
├── db.json                          [Optional JSON Server database]
├── package.json                     [npm configuration]
├── README.md                        [This file]
│
├── Frontend/
│   ├── index.html                   [Home page]
│   ├── css/
│   │   └── style.css                [Main stylesheet]
│   ├── javascript/
│   │   ├── api.js                   [API layer for JSON Server]
│   │   └── script.js                [Main application logic]
│   ├── pages/                       [All application pages]
│   │   ├── login.html
│   │   ├── signup.html
│   │   ├── jobs.html
│   │   ├── student-dashboard.html
│   │   ├── student-profile.html
│   │   ├── company-dashboard.html
│   │   ├── company-profile.html
│   │   ├── recommended-jobs.html
│   │   ├── post-job.html
│   │   ├── my-jobs.html
│   │   ├── applicants.html
│   │   ├── applications.html
│   │   └── admin-dashboard.html
│   └── data/                        [Legacy JSON files - kept for reference]
│       ├── students.json            (now empty; data seeded from `dataStore.js`)
│       ├── companies.json           (now empty)
│       └── jobs.json                (now empty)
│
└── Assets/
    └── Images/
        └── danyal.png
```

## 🔑 Test Credentials

**Student:**
- Email: `danyal@example.com`
- Password: `danyal123`

**Company:**
- Email: `hr@techcorp.com`
- Password: `techcorp123`

## Data store and API compatibility

The application now prefers the built-in `dataStore.js` which provides a localStorage-backed API-compatible surface. `script.js` calls functions like `getStudents()`, `createJob()`, `updateStudent()`, `getAppliedJobsFromAPI()`, and so on — these are provided by `dataStore.js` when JSON Server is not used.

If you still want to run with JSON Server, the app will attempt to use network API calls if implemented; otherwise it falls back to `localStorage`.

Legacy JSON Server endpoints (optional):
- `GET /students`, `POST /students`, `PATCH /students/:id`, etc. — only if you run JSON Server with `db.json`.

## 🔧 Development

### Quick start (no JSON Server required)

1. Open `Frontend/index.html` via Live Server or a local static server (see Running the Project Locally above).
2. The app will seed example data into `localStorage` on first run.

### Using JSON Server (optional / legacy)

1. Install dependencies (if not already):

```bash
npm install
```

2. Start JSON Server:

```bash
npm run server
```

3. If you run JSON Server, ensure any network API layer is configured to target the server URL.

### Making Code Changes

1. Edit files in `Frontend/javascript/` and refresh the browser.
2. HTML/CSS edits: refresh the browser to see changes.

### DataStore helpers

`Frontend/javascript/dataStore.js` exposes these functions (examples):
- `getStudents()`, `getCompanies()`, `getJobs()` — async functions returning arrays
- `createStudent(obj)`, `createCompany(obj)`, `createJob(obj)` — create and persist
- `updateStudent(id, updates)`, `updateCompany(id, updates)` — update records
- `getAppliedJobsFromAPI()`, `addAppliedJob(jobId)`, `getApplicantsForJobFromAPI(jobId)`, `addJobApplicant(jobId, studentId)` — helpers for applications

These functions are used directly by `script.js` and mimic a backend API surface while staying local.

## 🐛 Troubleshooting

Data not appearing?
- If you opened the site directly as `file://`, use Live Server or a local static server.
- Open browser DevTools (F12) and check console for errors.

Reset localStore seeded data:

1. Open DevTools → Application (or Storage) → Local Storage → select the site.
2. Remove keys: `students`, `companies`, `jobs`, `appliedJobs`, `jobApplicants`, `role`, `userId`.
3. Reload page — `dataStore.js` will reseed defaults.

Using JSON Server and localStore together:
- If you run JSON Server, ensure your API layer points to the server. Otherwise the app will operate using `localStorage`.

## 📝 Notes

- **Data Persistence (current)**: `dataStore.js` seeds and persists data in `localStorage`.
- **Session Management**: User sessions (`role`, `userId`) are stored in `localStorage`.
- **Applied Jobs**: Job applications are tracked in `localStorage` by default.
- **JSON Server**: Optional legacy workflow — production requires a real backend.

## 🎓 Learning Outcomes

This project demonstrates:
- Frontend web development skills
- JavaScript DOM manipulation
- RESTful API integration
- JSON Server usage
- localStorage API usage
- Role-based access control
- Responsive web design
- Form validation
- Dynamic content generation

## 📄 License

This is an academic project for educational purposes.


---

If you'd like, I can:
- remove the legacy JSON files from `Frontend/data` entirely,
- or add a small migration script to export/import the `localStorage` seed to a `db.json` for JSON Server.

---

**Note:** This repository now defaults to a client-side data store (`localStorage`) for easier local testing without extra server setup. For production use, replace `dataStore.js` with real API calls to a backend.

