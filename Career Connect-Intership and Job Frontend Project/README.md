# Career Connect – Internship & Job Portal

## 📋 Project Overview

Career Connect is a comprehensive frontend-only job and internship portal that connects students with companies. The platform enables students to search and apply for jobs while allowing companies to post job openings and manage applicants. Built with vanilla JavaScript, HTML, and CSS, the project uses **JSON Server** for data management and API endpoints.

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
- **JSON Server**: REST API for data management
- **localStorage API**: Client-side session management

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher) installed on your system
- npm (comes with Node.js)
- A modern web browser (Chrome, Firefox, Edge, Safari)
- VS Code with Live Server extension (recommended)

### Step 1: Install Dependencies

Open terminal/command prompt in the project root directory and run:

```bash
npm install
```

This will install `json-server` as a development dependency.

### Step 2: Start JSON Server

In the same terminal, start the JSON Server:

```bash
npm run server
```

The server will start on `http://localhost:3001` and watch the `db.json` file for changes.

**Keep this terminal window open** - the server needs to be running for the application to work.

### Step 3: Open the Application

1. **Option A: Using Live Server (Recommended)**
   - Open the project folder in VS Code
   - Right-click on `Frontend/index.html`
   - Select "Open with Live Server"
   - The application will open in your default browser

2. **Option B: Using Python HTTP Server**
   ```bash
   cd Frontend
   python -m http.server 8000
   ```
   - Open browser and navigate to `http://localhost:8000`

3. **Option C: Direct File Opening**
   - Simply double-click `Frontend/index.html`
   - Note: Some features may not work due to CORS restrictions

### Step 4: Verify Setup

- Check that JSON Server is running (you should see "Watching..." in the terminal)
- Open browser console (F12) to check for any errors
- Try logging in with test credentials (see below)

## 📁 Project Structure

```
Career Connect-Intership and Job Frontend Project/
│
├── db.json                          [JSON Server database]
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
│   └── data/                        [Original JSON files - kept for reference]
│       ├── students.json
│       ├── companies.json
│       └── jobs.json
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

## 📊 API Endpoints

The application uses JSON Server which provides RESTful API endpoints:

### Students
- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create new student
- `PATCH /students/:id` - Update student
- `DELETE /students/:id` - Delete student

### Companies
- `GET /companies` - Get all companies
- `GET /companies/:id` - Get company by ID
- `POST /companies` - Create new company
- `PATCH /companies/:id` - Update company
- `DELETE /companies/:id` - Delete company

### Jobs
- `GET /jobs` - Get all jobs
- `GET /jobs/:id` - Get job by ID
- `POST /jobs` - Create new job
- `PATCH /jobs/:id` - Update job
- `DELETE /jobs/:id` - Delete job

## 🔧 Development

### Running the Server

```bash
npm run server
```

This command:
- Starts JSON Server on port 3001
- Watches `db.json` for changes
- Provides REST API endpoints

### Making Changes

1. **Data Changes**: Edit `db.json` directly - JSON Server will automatically reload
2. **Code Changes**: Edit files in `Frontend/javascript/` - refresh browser to see changes
3. **UI Changes**: Edit HTML/CSS files - refresh browser to see changes

### API Layer

All API calls are handled through `Frontend/javascript/api.js`:
- Provides CRUD functions for students, companies, and jobs
- Handles error cases gracefully
- Falls back to localStorage if API is unavailable

## 🐛 Troubleshooting

### Server Not Starting
- Check if port 3001 is already in use
- Verify Node.js and npm are installed: `node --version` and `npm --version`
- Try a different port: `json-server --watch db.json --port 3002`

### API Errors
- Ensure JSON Server is running
- Check browser console for CORS errors
- Verify `db.json` is in the root directory
- Check API base URL in `api.js` matches server port

### Data Not Loading
- Verify JSON Server is running
- Check browser console for errors
- Ensure `api.js` is loaded before `script.js` in HTML files
- Clear browser cache and reload

### CORS Issues
- Use Live Server or a local web server (not file://)
- Ensure JSON Server is running on the correct port

## 📝 Notes

- **Data Persistence**: All data is stored in `db.json` and persists across server restarts
- **Session Management**: User sessions (role, userId) are stored in localStorage
- **Applied Jobs**: Job applications are tracked in localStorage (can be moved to API later)
- **No Backend Required**: JSON Server provides a mock backend for development

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

**Note:** This project uses JSON Server for demonstration purposes. For production use, a real backend server with proper authentication and database is required.

