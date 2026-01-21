/* ============================================
   CareerConnect - Functional Job Portal
   JSON + localStorage Implementation
   ============================================ */

// ===== GLOBAL DATA =====
let students = [];
let companies = [];
let jobs = [];

// Default data - Initial seed data
const DEFAULT_STUDENTS = [
    { id: 1, name: "Danyal Hussain", email: "danyal@example.com", password: "danyal123", cgpa: 3.8, skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"], degree: "Bachelor of Science in Computer Science", city: "Bahawalpur", resume: "" },
    { id: 2, name: "John Doe", email: "john@example.com", password: "john123", cgpa: 3.5, skills: ["Python", "Java", "SQL"], degree: "Bachelor of Science in Computer Science", city: "New York", resume: "" }
];

const DEFAULT_COMPANIES = [
    { id: 1, name: "Tech Corp Inc", email: "hr@techcorp.com", password: "techcorp123", industry: "Technology", location: "New York, NY", about: "Tech Corp Inc is a leading technology company specializing in software development and innovative solutions." },
    { id: 2, name: "Global Brands", email: "hr@globalbrands.com", password: "global123", industry: "Marketing", location: "Los Angeles, CA", about: "Global Brands is a leading marketing and branding agency." }
];

const DEFAULT_JOBS = [
    { id: 1, companyId: 1, title: "Frontend Developer", type: "Full-Time", skills: ["JavaScript", "React", "HTML", "CSS"], minCGPA: 3.5, location: "Remote / New York, NY", description: "We are looking for a skilled frontend developer.", salary: "$80,000 - $120,000", postedDate: "2025-01-15" },
    { id: 2, companyId: 1, title: "Backend Developer", type: "Full-Time", skills: ["Node.js", "Python", "SQL"], minCGPA: 3.6, location: "New York, NY", description: "Backend developer needed for our team.", salary: "$90,000 - $130,000", postedDate: "2025-01-14" },
    { id: 3, companyId: 2, title: "Marketing Intern", type: "Internship", skills: ["Marketing", "Social Media"], minCGPA: 3.0, location: "Los Angeles, CA", description: "Join our marketing team as an intern.", salary: "$20/hour", postedDate: "2025-01-13" },
    { id: 4, companyId: 2, title: "Content Creator", type: "Part-Time", skills: ["Content Creation", "Writing"], minCGPA: 3.2, location: "Remote", description: "Create engaging content for our brand.", salary: "$25/hour", postedDate: "2025-01-12" }
];

// ===== INITIALIZE DATA =====
function initializeData() {
    // Check if localStorage already has data
    if (!localStorage.getItem('students')) {
        localStorage.setItem('students', JSON.stringify(DEFAULT_STUDENTS));
    }
    if (!localStorage.getItem('companies')) {
        localStorage.setItem('companies', JSON.stringify(DEFAULT_COMPANIES));
    }
    if (!localStorage.getItem('jobs')) {
        localStorage.setItem('jobs', JSON.stringify(DEFAULT_JOBS));
    }
    if (!localStorage.getItem('appliedJobs')) {
        localStorage.setItem('appliedJobs', JSON.stringify([]));
    }
    if (!localStorage.getItem('jobApplicants')) {
        localStorage.setItem('jobApplicants', JSON.stringify({}));
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', initializeData);

// ===== DATA LOADING =====
async function loadData() {
    try {
        // Initialize data first
        initializeData();
        
        // Try to load from API, fall back to localStorage
        [students, companies, jobs] = await Promise.all([
            getStudents().catch(() => JSON.parse(localStorage.getItem('students') || '[]')),
            getCompanies().catch(() => JSON.parse(localStorage.getItem('companies') || '[]')),
            getJobs().catch(() => JSON.parse(localStorage.getItem('jobs') || '[]'))
        ]);
        
        // Ensure arrays are not empty
        students = students || JSON.parse(localStorage.getItem('students') || '[]');
        companies = companies || JSON.parse(localStorage.getItem('companies') || '[]');
        jobs = jobs || JSON.parse(localStorage.getItem('jobs') || '[]');
        
        return true;
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to localStorage
        students = JSON.parse(localStorage.getItem('students') || '[]');
        companies = JSON.parse(localStorage.getItem('companies') || '[]');
        jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        return false;
    }
}

// ===== LOCALSTORAGE HELPERS =====
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
}

// ===== ROLE MANAGEMENT =====
function getRole() {
    return localStorage.getItem('role') || '';
}

function setRole(role) {
    localStorage.setItem('role', role); // MANDATORY: Set role in localStorage
}

function getCurrentUser() {
    const role = getRole();
    if (!role) return null;
    
    const userId = parseInt(localStorage.getItem('userId') || '0');
    if (role === 'student') {
        return students.find(s => s.id === userId) || null;
    } else if (role === 'company') {
        return companies.find(c => c.id === userId) || null;
    }
    return null;
}

function setCurrentUser(user, role) {
    setRole(role);
    localStorage.setItem('userId', user.id.toString());
}

function logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    window.location.href = getPagePath('pages/login.html');
}

function getPagePath(page) {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        return page.replace('pages/', '');
    }
    return page;
}

// ===== DYNAMIC NAVBAR (MANDATORY) =====
function updateNavbar() {
    const role = localStorage.getItem('role'); // MANDATORY: Use localStorage.getItem("role")
    const navbar = document.querySelector('.navbar-nav');
    if (!navbar) return;

    navbar.innerHTML = '';

    if (!role) {
        // Before login: Home | Login | Signup | Jobs
        const homePath = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
        navbar.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="${homePath}">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="${getPagePath('pages/login.html')}">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="${getPagePath('pages/signup.html')}">Signup</a></li>
            <li class="nav-item"><a class="nav-link" href="${getPagePath('pages/jobs.html')}">Jobs</a></li>
        `;
    } else if (role === 'student') {
        // Student: Dashboard | Recommended Jobs | All Jobs | Profile | Logout
        navbar.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="${getPagePath('pages/student-dashboard.html')}">Dashboard</a></li>
            <li class="nav-item"><a class="nav-link" href="${getPagePath('pages/recommended-jobs.html')}">Recommended Jobs</a></li>
            <li class="nav-item"><a class="nav-link" href="${getPagePath('pages/jobs.html')}">All Jobs</a></li>
            <li class="nav-item"><a class="nav-link" href="${getPagePath('pages/student-profile.html')}">Profile</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="logout(); return false;">Logout</a></li>
        `;
    } else if (role === 'company') {
        // Company: Dashboard | Post Job | My Jobs | Applicants | Profile | Logout
        navbar.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="${getPagePath('pages/company-dashboard.html')}">Dashboard</a></li>
            <li class="nav-item"><a class="nav-link" href="${getPagePath('pages/post-job.html')}">Post Job</a></li>
            <li class="nav-item"><a class="nav-link" href="${getPagePath('pages/my-jobs.html')}">My Jobs</a></li>
            <li class="nav-item"><a class="nav-link" href="${getPagePath('pages/applicants.html')}">Applicants</a></li>
            <li class="nav-item"><a class="nav-link" href="${getPagePath('pages/company-profile.html')}">Profile</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="logout(); return false;">Logout</a></li>
        `;
    }
}

// ===== LOGIN FUNCTION =====
async function loginUser(e) {
    if (e) e.preventDefault();
    
    await loadData();
    
    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;
    const roleValue = document.getElementById('loginRole')?.value;

    if (!email || !password || !roleValue) {
        alert('Please fill in all fields.');
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    const role = roleValue.toLowerCase().includes('student') ? 'student' : 'company';
    const user = role === 'student' 
        ? students.find(s => s.email === email && s.password === password)
        : companies.find(c => c.email === email && c.password === password);

    if (!user) {
        alert('Invalid email or password. Please check and try again.');
        console.log('Students:', students);
        console.log('Companies:', companies);
        return false;
    }

    setCurrentUser(user, role);
    alert(`Login successful! Welcome ${user.name}.`);
    setTimeout(() => {
        window.location.href = getPagePath(`pages/${role}-dashboard.html`);
    }, 500);
    return false;
}

// ===== REGISTRATION FUNCTION =====
async function registerUser(e) {
    if (e) e.preventDefault();
    
    await loadData();
    
    const name = document.getElementById('signupName')?.value.trim();
    const email = document.getElementById('signupEmail')?.value.trim();
    const password = document.getElementById('signupPassword')?.value;
    const confirmPassword = document.getElementById('signupConfirmPassword')?.value;
    const roleValue = document.getElementById('signupRole')?.value;

    if (!name || !email || !password || !confirmPassword || !roleValue) {
        alert('Please fill in all fields.');
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    if (students.some(s => s.email === email) || companies.some(c => c.email === email)) {
        alert('Email already registered. Please login instead.');
        return false;
    }

    const role = roleValue.toLowerCase().includes('student') ? 'student' : 'company';
    const maxId = role === 'student' 
        ? (students.length > 0 ? Math.max(...students.map(s => s.id)) : 0)
        : (companies.length > 0 ? Math.max(...companies.map(c => c.id)) : 0);
    
    const newUser = role === 'student' ? {
        id: maxId + 1,
        name,
        email,
        password,
        cgpa: 0,
        skills: [],
        degree: '',
        city: '',
        resume: ''
    } : {
        id: maxId + 1,
        name,
        email,
        password,
        industry: '',
        location: '',
        about: ''
    };

    try {
        const created = role === 'student' 
            ? await createStudent(newUser)
            : await createCompany(newUser);
        
        if (role === 'student') {
            students.push(created);
            localStorage.setItem('students', JSON.stringify(students));
        } else {
            companies.push(created);
            localStorage.setItem('companies', JSON.stringify(companies));
        }
        
        // Don't auto-login, user must login manually
        alert(`Registration successful! Please login with your credentials.`);
        setTimeout(() => {
            window.location.href = getPagePath(`pages/login.html`);
        }, 500);
    } catch (error) {
        alert('Registration failed: ' + error.message);
        console.error('Registration error:', error);
    }
    return false;
}

// ===== STUDENT: GET RECOMMENDED JOBS =====
function getRecommendedJobs(student) {
    if (!student || !student.cgpa || !student.skills) return [];
    
    return jobs.filter(job =>
        student.cgpa >= job.minCGPA &&
        job.skills.some(skill => student.skills.includes(skill))
    );
}

// ===== STUDENT: APPLY TO JOB =====
async function applyJob(jobId) {
    await loadData();
    
    const role = getRole();
    if (role !== 'student') {
        alert('Please login as a student to apply for jobs.');
        return;
    }

    const student = getCurrentUser();
    if (!student) {
        alert('Please login first.');
        return;
    }

    const jobIdNum = parseInt(jobId);
    const job = jobs.find(j => j.id === jobIdNum);
    if (!job) {
        alert('Job not found.');
        return;
    }

    // Check if already applied - use API helper if available
    let appliedJobs = [];
    if (typeof window.getAppliedJobsFromAPI === 'function') {
        appliedJobs = window.getAppliedJobsFromAPI();
    } else {
        appliedJobs = getFromLocalStorage('appliedJobs') || [];
    }
    if (appliedJobs.includes(jobIdNum)) {
        alert('You have already applied for this job.');
        return;
    }

    const confirmed = confirm(`Are you sure you want to apply for "${job.title}"?`);
    if (confirmed) {
        // Store jobId in appliedJobs[] (MANDATORY) - using API helper if available
        if (typeof window.addAppliedJob === 'function') {
            window.addAppliedJob(jobIdNum);
        } else {
            let appliedJobs = [];
            if (typeof window.getAppliedJobsFromAPI === 'function') {
                appliedJobs = window.getAppliedJobsFromAPI();
            } else {
                appliedJobs = getFromLocalStorage('appliedJobs') || [];
            }
            if (!appliedJobs.includes(jobIdNum)) {
                appliedJobs.push(jobIdNum);
                saveToLocalStorage('appliedJobs', appliedJobs);
            }
        }
        
        // Also track which students applied to which jobs for company view
        if (typeof window.addJobApplicant === 'function') {
            window.addJobApplicant(jobIdNum, student.id);
        } else {
            const jobApplicants = getFromLocalStorage('jobApplicants') || {};
            if (!jobApplicants[jobIdNum]) {
                jobApplicants[jobIdNum] = [];
            }
            if (!jobApplicants[jobIdNum].includes(student.id)) {
                jobApplicants[jobIdNum].push(student.id);
                saveToLocalStorage('jobApplicants', jobApplicants);
            }
        }
        
        alert(`Congratulations! You have successfully applied for "${job.title}".`);
        
        // Update button
        const button = event.target;
        if (button) {
            button.textContent = 'Applied ✓';
            button.classList.remove('btn-primary');
            button.classList.add('btn-success');
            button.disabled = true;
        }
    }
}

// ===== STUDENT: GET APPLIED JOBS =====
function getAppliedJobs() {
    // Get applied job IDs - use API helper if available, otherwise fallback to localStorage
    let appliedJobIds = [];
    if (typeof window.getAppliedJobsFromAPI === 'function') {
        appliedJobIds = window.getAppliedJobsFromAPI();
    } else {
        appliedJobIds = getFromLocalStorage('appliedJobs') || [];
    }
    return jobs.filter(job => appliedJobIds.includes(job.id));
}

// ===== STUDENT: SEARCH JOBS (MANDATORY: title, skills, location) =====
function searchJobs(query) {
    if (!query) return jobs;
    
    const lowerQuery = query.toLowerCase();
    return jobs.filter(job =>
        job.title.toLowerCase().includes(lowerQuery) ||
        job.location.toLowerCase().includes(lowerQuery) ||
        (job.skills && job.skills.some(skill => skill.toLowerCase().includes(lowerQuery)))
    );
}

// ===== COMPANY: POST JOB =====
async function postJob() {
    await loadData();
    
    const role = getRole();
    if (role !== 'company') {
        alert('Please login as a company to post jobs.');
        return;
    }

    const company = getCurrentUser();
    if (!company) {
        alert('Please login first.');
        return;
    }

    const title = prompt('Job Title:');
    if (!title) return;

    const type = prompt('Job Type (Full-Time / Part-Time / Internship):');
    if (!type) return;

    const skillsInput = prompt('Required Skills (comma-separated):');
    if (!skillsInput) return;
    const skills = skillsInput.split(',').map(s => s.trim());

    const minCGPA = parseFloat(prompt('Minimum CGPA:'));
    if (isNaN(minCGPA)) {
        alert('Invalid CGPA.');
        return;
    }

    const location = prompt('Location:');
    if (!location) return;

    // Get max ID from existing jobs
    const maxId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id), 0) : 0;
    const newJob = {
        id: maxId + 1,
        companyId: company.id,
        title,
        type,
        skills,
        minCGPA,
        location
    };

    // Create job via API
    const createdJob = await createJob(newJob);
    jobs.push(createdJob);

    alert('Job posted successfully!');
    
    // Reload if on my-jobs page
    if (window.location.pathname.includes('my-jobs.html')) {
        loadMyJobsPage();
    }
}

// ===== COMPANY: GET MY JOBS =====
function getMyJobs() {
    const company = getCurrentUser();
    if (!company) return [];
    return jobs.filter(job => job.companyId === company.id);
}

// ===== COMPANY: GET APPLICANTS FOR JOB =====
function getApplicantsForJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return [];
    
    // Get applicant student IDs - use API helper if available
    let applicantStudentIds = [];
    if (typeof window.getApplicantsForJobFromAPI === 'function') {
        applicantStudentIds = window.getApplicantsForJobFromAPI(jobId);
    } else {
        const jobApplicants = getFromLocalStorage('jobApplicants') || {};
        applicantStudentIds = jobApplicants[jobId] || [];
    }
    
    // Return students who applied to this job
    return students.filter(student => applicantStudentIds.includes(student.id));
}

// ===== COMPANY: VIEW STUDENT PROFILE =====
function viewStudentProfile(studentId) {
    const student = students.find(s => s.id === parseInt(studentId));
    if (!student) {
        alert('Student not found.');
        return;
    }

    let profile = `Student Profile:\n\n`;
    profile += `Name: ${student.name}\n`;
    profile += `Email: ${student.email}\n`;
    profile += `CGPA: ${student.cgpa}\n`;
    profile += `Degree: ${student.degree || 'Not provided'}\n`;
    profile += `City: ${student.city || 'Not provided'}\n`;
    profile += `Skills: ${student.skills && student.skills.length > 0 ? student.skills.join(', ') : 'None'}\n`;
    if (student.resume) profile += `Resume: ${student.resume}\n`;

    alert(profile);
}

// ===== STUDENT: EDIT PROFILE =====
async function editStudentProfile() {
    await loadData();
    const student = getCurrentUser();
    if (!student || getRole() !== 'student') {
        alert('Please login as a student.');
        return;
    }

    const field = prompt('What would you like to edit?\n1. Skills\n2. City\n3. Resume Link\n4. CGPA\n5. Degree');
    if (!field) return;

    const studentIndex = students.findIndex(s => s.id === student.id);
    if (studentIndex === -1) return;

    let updated = false;
    let updates = {};
    switch(field) {
        case '1':
        case 'Skills':
            const skill = prompt('Enter skill to add:');
            if (skill) {
                if (!students[studentIndex].skills) students[studentIndex].skills = [];
                if (!students[studentIndex].skills.includes(skill)) {
                    students[studentIndex].skills.push(skill);
                    updates.skills = students[studentIndex].skills;
                    updated = true;
                }
            }
            break;
        case '2':
        case 'City':
            const city = prompt('Enter city:', students[studentIndex].city || '');
            if (city !== null) {
                students[studentIndex].city = city;
                updates.city = city;
                updated = true;
            }
            break;
        case '3':
        case 'Resume Link':
            const resume = prompt('Enter resume URL:', students[studentIndex].resume || '');
            if (resume !== null) {
                students[studentIndex].resume = resume;
                updates.resume = resume;
                updated = true;
            }
            break;
        case '4':
        case 'CGPA':
            const cgpa = parseFloat(prompt('Enter CGPA:', students[studentIndex].cgpa || '0'));
            if (!isNaN(cgpa)) {
                students[studentIndex].cgpa = cgpa;
                updates.cgpa = cgpa;
                updated = true;
            }
            break;
        case '5':
        case 'Degree':
            const degree = prompt('Enter degree:', students[studentIndex].degree || '');
            if (degree !== null) {
                students[studentIndex].degree = degree;
                updates.degree = degree;
                updated = true;
            }
            break;
    }

    if (updated) {
        // Update via API
        await updateStudent(student.id, updates);
        // Update local array
        Object.assign(students[studentIndex], updates);
        setCurrentUser(students[studentIndex], 'student');
        alert('Profile updated successfully!');
        if (window.location.pathname.includes('student-profile.html')) {
            location.reload();
        }
    }
}

// ===== COMPANY: EDIT PROFILE =====
async function editCompanyProfile() {
    await loadData();
    const company = getCurrentUser();
    if (!company || getRole() !== 'company') {
        alert('Please login as a company.');
        return;
    }

    const field = prompt('What would you like to edit?\n1. Industry\n2. Location\n3. About');
    if (!field) return;

    const companyIndex = companies.findIndex(c => c.id === company.id);
    if (companyIndex === -1) return;

    let updated = false;
    let updates = {};
    switch(field) {
        case '1':
        case 'Industry':
            const industry = prompt('Enter industry:', companies[companyIndex].industry || '');
            if (industry !== null) {
                companies[companyIndex].industry = industry;
                updates.industry = industry;
                updated = true;
            }
            break;
        case '2':
        case 'Location':
            const location = prompt('Enter location:', companies[companyIndex].location || '');
            if (location !== null) {
                companies[companyIndex].location = location;
                updates.location = location;
                updated = true;
            }
            break;
        case '3':
        case 'About':
            const about = prompt('Enter about:', companies[companyIndex].about || '');
            if (about !== null) {
                companies[companyIndex].about = about;
                updates.about = about;
                updated = true;
            }
            break;
    }

    if (updated) {
        // Update via API
        await updateCompany(company.id, updates);
        // Update local array
        Object.assign(companies[companyIndex], updates);
        setCurrentUser(companies[companyIndex], 'company');
        alert('Profile updated successfully!');
        if (window.location.pathname.includes('company-profile.html')) {
            location.reload();
        }
    }
}

// ===== PAGE LOADERS =====
async function loadStudentDashboard() {
    await loadData();
    const student = getCurrentUser();
    if (!student || getRole() !== 'student') {
        window.location.href = getPagePath('pages/login.html');
        return;
    }

    // Load recommended jobs
    const recommended = getRecommendedJobs(student);
    const container = document.querySelector('.container');
    if (container) {
        const existingSection = document.getElementById('recommendedSection');
        if (existingSection) existingSection.remove();
        
        const section = document.createElement('div');
        section.id = 'recommendedSection';
        section.className = 'mb-5';
        section.innerHTML = `
            <h2 class="mb-4">Recommended Jobs for You</h2>
            ${recommended.length > 0 ? 
                recommended.map(job => {
                    const company = companies.find(c => c.id === job.companyId);
                    return `
                        <div class="job-card mb-3">
                            <h4>${job.title}</h4>
                            <p class="text-secondary">${company ? company.name : 'Company'}</p>
                            <p>${job.location} | ${job.type}</p>
                            <p>Skills: ${job.skills.join(', ')}</p>
                            <p>Min CGPA: ${job.minCGPA}</p>
                            <button class="btn btn-primary apply-btn" data-job-id="${job.id}">Apply Now</button>
                        </div>
                    `;
                }).join('') :
                '<p class="text-secondary">No recommended jobs at the moment.</p>'
            }
        `;
        container.insertBefore(section, container.firstChild);
    }
}

async function loadRecommendedJobsPage() {
    await loadData();
    const student = getCurrentUser();
    if (!student || getRole() !== 'student') {
        window.location.href = getPagePath('pages/login.html');
        return;
    }

    const recommended = getRecommendedJobs(student);
    const container = document.querySelector('.container');
    if (container) {
        const jobsList = document.getElementById('jobsList') || container;
        jobsList.innerHTML = recommended.length > 0 ? 
            recommended.map(job => {
                const company = companies.find(c => c.id === job.companyId);
                let appliedJobs = [];
                if (typeof window.getAppliedJobsFromAPI === 'function') {
                    appliedJobs = window.getAppliedJobsFromAPI();
                } else {
                    appliedJobs = getFromLocalStorage('appliedJobs') || [];
                }
                const hasApplied = appliedJobs.includes(job.id);
                
                return `
                    <div class="job-card mb-3">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <span class="job-type ${job.type === 'Full-Time' ? 'job-type-fulltime' : 'job-type-internship'}">${job.type}</span>
                                <h3 class="mt-2 mb-1">${job.title}</h3>
                                <p class="text-secondary mb-1"><i class="fas fa-building me-2"></i>${company ? company.name : 'Company'}</p>
                                <p class="text-secondary mb-0"><i class="fas fa-map-marker-alt me-2"></i>${job.location}</p>
                            </div>
                            <button class="btn ${hasApplied ? 'btn-success' : 'btn-primary'} apply-btn" 
                                    data-job-id="${job.id}" ${hasApplied ? 'disabled' : ''}>
                                ${hasApplied ? 'Applied ✓' : 'Apply Now'}
                            </button>
                        </div>
                        <p class="mb-3">Min CGPA Required: ${job.minCGPA}</p>
                        <div>${job.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}</div>
                    </div>
                `;
            }).join('') :
            '<p class="text-center text-secondary py-5">No recommended jobs at the moment.</p>';
    }
}

async function loadAllJobsPage() {
    await loadData();
    
    const container = document.querySelector('.container');
    if (!container) return;

    const role = getRole();
    const student = getCurrentUser();
    let appliedJobs = [];
    if (typeof window.getAppliedJobsFromAPI === 'function') {
        appliedJobs = window.getAppliedJobsFromAPI();
    } else {
        appliedJobs = getFromLocalStorage('appliedJobs') || [];
    }

    // Setup search
    const searchInput = container.querySelector('input[placeholder="Search jobs..."]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value;
            const filtered = searchJobs(query);
            renderJobs(filtered, role === 'student', student, appliedJobs);
        });
    }

    renderJobs(jobs, role === 'student', student, appliedJobs);
}

function renderJobs(jobsToRender, isStudent, student, appliedJobs) {
    const jobsList = document.getElementById('jobsList');
    if (!jobsList) return;

    jobsList.innerHTML = jobsToRender.length > 0 ?
        jobsToRender.map(job => {
            const company = companies.find(c => c.id === job.companyId);
            const hasApplied = appliedJobs.includes(job.id);
            
            return `
                <div class="job-card">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <span class="job-type ${job.type === 'Full-Time' ? 'job-type-fulltime' : job.type === 'Part-Time' ? 'job-type-fulltime' : 'job-type-internship'}">${job.type}</span>
                            <h3 class="mt-2 mb-1">${job.title}</h3>
                            <p class="text-secondary mb-1"><i class="fas fa-building me-2"></i>${company ? company.name : 'Company'}</p>
                            <p class="text-secondary mb-0"><i class="fas fa-map-marker-alt me-2"></i>${job.location}</p>
                        </div>
                        ${isStudent ? 
                            `<button class="btn ${hasApplied ? 'btn-success' : 'btn-primary'} apply-btn" 
                                     data-job-id="${job.id}" ${hasApplied ? 'disabled' : ''}>
                                ${hasApplied ? 'Applied ✓' : 'Apply Now'}
                            </button>` :
                            '<button class="btn btn-outline-primary" disabled>Login to Apply</button>'
                        }
                    </div>
                    <p class="mb-3">Min CGPA: ${job.minCGPA}</p>
                    <div>${job.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}</div>
                </div>
            `;
        }).join('') :
        '<p class="text-center text-secondary py-5">No jobs found.</p>';
}

async function loadMyJobsPage() {
    await loadData();
    const company = getCurrentUser();
    if (!company || getRole() !== 'company') {
        window.location.href = getPagePath('pages/login.html');
        return;
    }

    const myJobs = getMyJobs();
    const container = document.querySelector('.container');
    if (container) {
        const jobsList = document.getElementById('jobsList') || container;
        jobsList.innerHTML = myJobs.length > 0 ?
            myJobs.map(job => {
                const applicants = getApplicantsForJob(job.id);
                return `
                    <div class="job-card mb-3">
                        <h4>${job.title}</h4>
                        <p class="text-secondary">${job.type} | ${job.location}</p>
                        <p>Skills: ${job.skills.join(', ')}</p>
                        <p>Min CGPA: ${job.minCGPA}</p>
                        <p><strong>Applicants: ${applicants.length}</strong></p>
                        <button class="btn btn-primary view-applicants-btn" data-job-id="${job.id}">
                            View Applicants
                        </button>
                    </div>
                `;
            }).join('') :
            '<p class="text-secondary">No jobs posted yet.</p>';
        
        // Add event listeners
        container.querySelectorAll('.view-applicants-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const jobId = parseInt(this.getAttribute('data-job-id'));
                showApplicants(jobId);
            });
        });
    }
}

function showApplicants(jobId) {
    const applicants = getApplicantsForJob(jobId);
    const job = jobs.find(j => j.id === jobId);
    
    if (applicants.length === 0) {
        alert(`No applicants for "${job ? job.title : 'this job'}" yet.`);
        return;
    }

    let list = `Applicants for "${job ? job.title : 'Job'}":\n\n`;
    applicants.forEach((student, index) => {
        list += `${index + 1}. ${student.name}\n`;
        list += `   Email: ${student.email}\n`;
        list += `   CGPA: ${student.cgpa}\n`;
        list += `   Skills: ${student.skills.length > 0 ? student.skills.join(', ') : 'None'}\n`;
        list += `   City: ${student.city || 'Not provided'}\n`;
        list += `   [Click "View Profile" button to see full details]\n\n`;
    });
    
    // Show in a more interactive way - create modal-like display
    const container = document.querySelector('.container');
    if (container) {
        const modal = document.createElement('div');
        modal.className = 'card mb-4';
        modal.innerHTML = `
            <div class="card-header">
                <h5>Applicants for "${job ? job.title : 'Job'}"</h5>
            </div>
            <div class="card-body">
                ${applicants.map((student, index) => `
                    <div class="mb-3 p-3 border rounded">
                        <h6>${index + 1}. ${student.name}</h6>
                        <p class="mb-1"><strong>Email:</strong> ${student.email}</p>
                        <p class="mb-1"><strong>CGPA:</strong> ${student.cgpa}</p>
                        <p class="mb-1"><strong>Skills:</strong> ${student.skills.length > 0 ? student.skills.join(', ') : 'None'}</p>
                        <p class="mb-2"><strong>City:</strong> ${student.city || 'Not provided'}</p>
                        <button class="btn btn-sm btn-primary view-student-profile-btn" data-student-id="${student.id}">
                            View Full Profile
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(modal);
        
        // Add event listeners
        modal.querySelectorAll('.view-student-profile-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const studentId = parseInt(this.getAttribute('data-student-id'));
                viewStudentProfile(studentId);
            });
        });
    } else {
        alert(list);
    }
}

async function loadCompanyDashboard() {
    await loadData();
    const company = getCurrentUser();
    if (!company || getRole() !== 'company') {
        window.location.href = getPagePath('pages/login.html');
        return;
    }

    const myJobs = getMyJobs();
    const container = document.querySelector('.container');
    if (container) {
        const existingSection = document.getElementById('myJobsSection');
        if (existingSection) existingSection.remove();
        
        const section = document.createElement('div');
        section.id = 'myJobsSection';
        section.className = 'mb-5';
        section.innerHTML = `
            <h2 class="mb-4">My Posted Jobs</h2>
            ${myJobs.length > 0 ?
                myJobs.map(job => {
                    const applicants = getApplicantsForJob(job.id);
                    return `
                        <div class="job-card mb-3">
                            <h4>${job.title}</h4>
                            <p class="text-secondary">${job.type} | ${job.location}</p>
                            <p><strong>Applicants: ${applicants.length}</strong></p>
                            <button class="btn btn-primary view-applicants-btn" data-job-id="${job.id}">
                                View Applicants
                            </button>
                        </div>
                    `;
                }).join('') :
                '<p class="text-secondary">No jobs posted yet.</p>'
            }
        `;
        container.insertBefore(section, container.firstChild);
        
        // Add event listeners
        section.querySelectorAll('.view-applicants-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const jobId = parseInt(this.getAttribute('data-job-id'));
                showApplicants(jobId);
            });
        });
    }
}

// ===== INITIALIZE ADMIN DASHBOARD =====
async function initializeAdminDashboard() {
    await loadData();
    
    const studentsEl = document.getElementById('totalStudents');
    const companiesEl = document.getElementById('totalCompanies');
    const jobsEl = document.getElementById('totalJobs');
    
    if (studentsEl) studentsEl.textContent = students.length.toLocaleString();
    if (companiesEl) companiesEl.textContent = companies.length.toLocaleString();
    if (jobsEl) jobsEl.textContent = jobs.length.toLocaleString();
}

// ===== UPLOAD FILE FUNCTION =====
function uploadFile(type) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    
    if (type === 'resume') {
        fileInput.accept = '.pdf,.doc,.docx';
        fileInput.onchange = async function() {
            if (this.files && this.files[0]) {
                const student = getCurrentUser();
                if (student && getRole() === 'student') {
                    await loadData();
                    const studentIndex = students.findIndex(s => s.id === student.id);
                    if (studentIndex !== -1) {
                        students[studentIndex].resume = this.files[0].name;
                        saveToLocalStorage('students', students);
                    }
                }
                alert(`Resume "${this.files[0].name}" uploaded successfully!`);
            }
        };
    } else if (type === 'profile') {
        fileInput.accept = '.jpg,.jpeg,.png,.gif';
        fileInput.onchange = function() {
            if (this.files && this.files[0]) {
                alert(`Profile picture "${this.files[0].name}" uploaded successfully!`);
            }
        };
    }
    
    fileInput.click();
}

// ===== PAGE INITIALIZATION =====
async function initializePage() {
    await loadData();
    
    // Update navbar based on role
    updateNavbar();
    
    // Check authentication for protected pages
    const currentPath = window.location.pathname;
    const role = getRole();
    
    if (currentPath.includes('student-dashboard.html') || 
        currentPath.includes('recommended-jobs.html') ||
        currentPath.includes('student-profile.html')) {
        if (role !== 'student') {
            window.location.href = getPagePath('pages/login.html');
            return;
        }
    }
    
    if (currentPath.includes('company-dashboard.html') ||
        currentPath.includes('post-job.html') ||
        currentPath.includes('my-jobs.html') ||
        currentPath.includes('applicants.html') ||
        currentPath.includes('company-profile.html')) {
        if (role !== 'company') {
            window.location.href = getPagePath('pages/login.html');
            return;
        }
    }
    
    // Initialize specific pages
    if (document.getElementById('totalStudents')) {
        initializeAdminDashboard();
    }
    
    if (currentPath.includes('student-dashboard.html')) {
        loadStudentDashboard();
    }
    
    if (currentPath.includes('recommended-jobs.html')) {
        loadRecommendedJobsPage();
    }
    
    if (currentPath.includes('jobs.html')) {
        loadAllJobsPage();
    }
    
    if (currentPath.includes('my-jobs.html')) {
        loadMyJobsPage();
    }
    
    if (currentPath.includes('company-dashboard.html')) {
        loadCompanyDashboard();
    }
    
    if (currentPath.includes('post-job.html')) {
        const container = document.querySelector('.container');
        if (container) {
            const btn = document.createElement('button');
            btn.className = 'btn btn-primary btn-lg';
            btn.textContent = 'Post New Job';
            btn.onclick = postJob;
            container.appendChild(btn);
        }
    }
    
    if (currentPath.includes('applications.html') && role === 'student') {
        loadApplicationsPage();
    }
    
    // Add event listeners for apply buttons
    document.querySelectorAll('.apply-btn').forEach(button => {
        button.addEventListener('click', function() {
            const jobId = this.getAttribute('data-job-id');
            if (jobId) applyJob(jobId);
        });
    });
    
    // Add upload button listeners
    const uploadResumeBtn = document.getElementById('uploadResumeBtn');
    if (uploadResumeBtn) {
        uploadResumeBtn.addEventListener('click', () => uploadFile('resume'));
    }
    
    const uploadProfileBtn = document.getElementById('uploadProfileBtn');
    if (uploadProfileBtn) {
        uploadProfileBtn.addEventListener('click', () => uploadFile('profile'));
    }
    
    // Add edit profile button listeners
    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.includes('Edit Profile') || (btn.querySelector('.fa-edit') && btn.textContent.includes('Edit'))) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                if (role === 'student') {
                    editStudentProfile();
                } else if (role === 'company') {
                    editCompanyProfile();
                }
            });
        }
    });
    
    // Load profile data
    if (currentPath.includes('student-profile.html') && role === 'student') {
        loadStudentProfileData();
    }
    
    if (currentPath.includes('company-profile.html') && role === 'company') {
        loadCompanyProfileData();
    }
}

// ===== LOAD STUDENT PROFILE DATA =====
async function loadStudentProfileData() {
    await loadData();
    const student = getCurrentUser();
    if (!student) return;
    
    const nameEl = document.querySelector('.profile-header h1');
    if (nameEl) nameEl.textContent = student.name;
    
    const leadEl = document.querySelector('.profile-header .lead');
    if (leadEl) leadEl.textContent = student.degree || 'Student';
    
    const emailSection = document.querySelector('.card-body p');
    if (emailSection && emailSection.textContent.includes('Email')) {
        emailSection.innerHTML = `<strong><i class="fas fa-envelope me-2"></i>Email:</strong><br>${student.email}`;
    }
    
    const skillsCard = document.querySelector('.card:has(.fa-code)');
    if (skillsCard && student.skills) {
        const skillsBody = skillsCard.querySelector('.card-body');
        if (skillsBody) {
            skillsBody.innerHTML = `
                <h6 class="mb-2">Skills</h6>
                <div>
                    ${student.skills.map(s => `<span class="skill-badge">${s}</span>`).join('')}
                </div>
            `;
        }
    }
}

// ===== LOAD COMPANY PROFILE DATA =====
async function loadCompanyProfileData() {
    await loadData();
    const company = getCurrentUser();
    if (!company) return;
    
    const nameEl = document.querySelector('.profile-header h1');
    if (nameEl) nameEl.textContent = company.name;
    
    const leadEl = document.querySelector('.profile-header .lead');
    if (leadEl) leadEl.textContent = company.industry || 'Company';
    
    const emailSection = document.querySelector('.card-body p');
    if (emailSection && emailSection.textContent.includes('Email')) {
        emailSection.innerHTML = `<strong><i class="fas fa-envelope me-2"></i>Email:</strong><br>${company.email}`;
    }
}

// ===== LOAD APPLICATIONS PAGE =====
async function loadApplicationsPage() {
    await loadData();
    const student = getCurrentUser();
    if (!student || getRole() !== 'student') {
        window.location.href = getPagePath('pages/login.html');
        return;
    }
    
    let appliedJobIds = [];
    if (typeof window.getAppliedJobsFromAPI === 'function') {
        appliedJobIds = window.getAppliedJobsFromAPI();
    } else {
        appliedJobIds = getFromLocalStorage('appliedJobs') || [];
    }
    const appliedJobsList = jobs.filter(job => appliedJobIds.includes(job.id));
    
    // Update stats
    const totalEl = document.querySelector('.text-primary');
    const pendingEl = document.querySelector('.text-warning');
    const reviewedEl = document.querySelector('.text-info');
    const acceptedEl = document.querySelector('.text-success');
    
    if (totalEl) totalEl.textContent = appliedJobsList.length;
    // For demo, set some statuses (in real app, would come from backend)
    if (pendingEl) pendingEl.textContent = Math.ceil(appliedJobsList.length * 0.5);
    if (reviewedEl) reviewedEl.textContent = Math.ceil(appliedJobsList.length * 0.3);
    if (acceptedEl) acceptedEl.textContent = Math.ceil(appliedJobsList.length * 0.2);
    
    // Update table
    const tableBody = document.querySelector('tbody');
    if (tableBody) {
        tableBody.innerHTML = '';
        appliedJobsList.forEach((job, index) => {
            const company = companies.find(c => c.id === job.companyId);
            const statuses = ['Pending', 'Reviewed', 'Accepted', 'Rejected'];
            const status = statuses[index % statuses.length];
            const statusClass = status === 'Pending' ? 'badge-warning' :
                               status === 'Reviewed' ? 'badge-info' :
                               status === 'Accepted' ? 'badge-success' : 'badge-danger';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${job.title}</td>
                <td>${company ? company.name : 'Company'}</td>
                <td>${new Date().toISOString().split('T')[0]}</td>
                <td>
                    <span class="badge ${statusClass} status-badge" 
                          data-status="${status}" 
                          data-job-title="${job.title}">${status}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary">View</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// ===== RUN WHEN PAGE LOADS =====
document.addEventListener('DOMContentLoaded', initializePage);

// ===== FORM SUBMISSION HANDLERS =====
// Forms use onsubmit handlers in HTML
