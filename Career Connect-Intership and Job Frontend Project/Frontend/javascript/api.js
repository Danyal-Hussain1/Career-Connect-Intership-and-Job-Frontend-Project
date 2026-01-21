/* ============================================
   CareerConnect - API Layer for JSON Server
   CRUD Operations with localStorage Fallback
   ============================================ */

const API_BASE_URL = 'http://localhost:3001';
let useLocalStorage = false; // Flag to use localStorage if API fails

// ===== HELPER FUNCTIONS =====
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: { 'Content-Type': 'application/json', ...options.headers },
            ...options
        });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.warn('API request failed, attempting localStorage fallback:', error);
        useLocalStorage = true;
        throw error;
    }
}

// ===== STUDENTS CRUD =====
async function getStudents() {
    try {
        return await apiRequest('/students');
    } catch (error) {
        return JSON.parse(localStorage.getItem('students') || '[]');
    }
}

async function getStudent(id) {
    try {
        return await apiRequest(`/students/${id}`);
    } catch (error) {
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        return students.find(s => s.id === id) || null;
    }
}

async function createStudent(student) {
    try {
        const result = await apiRequest('/students', {
            method: 'POST',
            body: JSON.stringify(student)
        });
        // Also save to localStorage
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        students.push(result);
        localStorage.setItem('students', JSON.stringify(students));
        return result;
    } catch (error) {
        // Save to localStorage only
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const newStudent = { ...student, id: student.id || Date.now() };
        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));
        return newStudent;
    }
}

async function updateStudent(id, updates) {
    try {
        const result = await apiRequest(`/students/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updates)
        });
        // Also update localStorage
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const index = students.findIndex(s => s.id === id);
        if (index >= 0) {
            students[index] = { ...students[index], ...updates };
            localStorage.setItem('students', JSON.stringify(students));
        }
        return result;
    } catch (error) {
        // Update localStorage only
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const index = students.findIndex(s => s.id === id);
        if (index >= 0) {
            students[index] = { ...students[index], ...updates };
            localStorage.setItem('students', JSON.stringify(students));
            return students[index];
        }
        throw error;
    }
}

async function deleteStudent(id) {
    try {
        return await apiRequest(`/students/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        // Delete from localStorage only
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const filtered = students.filter(s => s.id !== id);
        localStorage.setItem('students', JSON.stringify(filtered));
        return { id };
    }
}

// ===== COMPANIES CRUD =====
async function getCompanies() {
    try {
        return await apiRequest('/companies');
    } catch (error) {
        return JSON.parse(localStorage.getItem('companies') || '[]');
    }
}

async function getCompany(id) {
    try {
        return await apiRequest(`/companies/${id}`);
    } catch (error) {
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        return companies.find(c => c.id === id) || null;
    }
}

async function createCompany(company) {
    try {
        const result = await apiRequest('/companies', {
            method: 'POST',
            body: JSON.stringify(company)
        });
        // Also save to localStorage
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        companies.push(result);
        localStorage.setItem('companies', JSON.stringify(companies));
        return result;
    } catch (error) {
        // Save to localStorage only
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        const newCompany = { ...company, id: company.id || Date.now() };
        companies.push(newCompany);
        localStorage.setItem('companies', JSON.stringify(companies));
        return newCompany;
    }
}

async function updateCompany(id, updates) {
    try {
        const result = await apiRequest(`/companies/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updates)
        });
        // Also update localStorage
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        const index = companies.findIndex(c => c.id === id);
        if (index >= 0) {
            companies[index] = { ...companies[index], ...updates };
            localStorage.setItem('companies', JSON.stringify(companies));
        }
        return result;
    } catch (error) {
        // Update localStorage only
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        const index = companies.findIndex(c => c.id === id);
        if (index >= 0) {
            companies[index] = { ...companies[index], ...updates };
            localStorage.setItem('companies', JSON.stringify(companies));
            return companies[index];
        }
        throw error;
    }
}

async function deleteCompany(id) {
    try {
        return await apiRequest(`/companies/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        // Delete from localStorage only
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        const filtered = companies.filter(c => c.id !== id);
        localStorage.setItem('companies', JSON.stringify(filtered));
        return { id };
    }
}

// ===== JOBS CRUD =====
async function getJobs() {
    try {
        return await apiRequest('/jobs');
    } catch (error) {
        return JSON.parse(localStorage.getItem('jobs') || '[]');
    }
}

async function getJob(id) {
    try {
        return await apiRequest(`/jobs/${id}`);
    } catch (error) {
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        return jobs.find(j => j.id === id) || null;
    }
}

async function createJob(job) {
    try {
        const result = await apiRequest('/jobs', {
            method: 'POST',
            body: JSON.stringify(job)
        });
        // Also save to localStorage
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        jobs.push(result);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        return result;
    } catch (error) {
        // Save to localStorage only
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        const newJob = { ...job, id: job.id || Date.now() };
        jobs.push(newJob);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        return newJob;
    }
}

async function updateJob(id, updates) {
    try {
        const result = await apiRequest(`/jobs/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updates)
        });
        // Also update localStorage
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        const index = jobs.findIndex(j => j.id === id);
        if (index >= 0) {
            jobs[index] = { ...jobs[index], ...updates };
            localStorage.setItem('jobs', JSON.stringify(jobs));
        }
        return result;
    } catch (error) {
        // Update localStorage only
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        const index = jobs.findIndex(j => j.id === id);
        if (index >= 0) {
            jobs[index] = { ...jobs[index], ...updates };
            localStorage.setItem('jobs', JSON.stringify(jobs));
            return jobs[index];
        }
        throw error;
    }
}

async function deleteJob(id) {
    try {
        return await apiRequest(`/jobs/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        // Delete from localStorage only
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        const filtered = jobs.filter(j => j.id !== id);
        localStorage.setItem('jobs', JSON.stringify(filtered));
        return { id };
    }
}

// ===== APPLIED JOBS (localStorage for now, can be moved to API later) =====
function getAppliedJobsFromAPI() {
    return JSON.parse(localStorage.getItem('appliedJobs') || '[]');
}

function addAppliedJob(jobId) {
    const appliedJobs = getAppliedJobsFromAPI();
    if (!appliedJobs.includes(jobId)) {
        appliedJobs.push(jobId);
        localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    }
    return appliedJobs;
}

function removeAppliedJob(jobId) {
    const appliedJobs = getAppliedJobsFromAPI().filter(id => id !== jobId);
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    return appliedJobs;
}

// ===== JOB APPLICANTS (localStorage for now, can be moved to API later) =====
function getJobApplicants() {
    return JSON.parse(localStorage.getItem('jobApplicants') || '{}');
}

function addJobApplicant(jobId, studentId) {
    const jobApplicants = getJobApplicants();
    if (!jobApplicants[jobId]) {
        jobApplicants[jobId] = [];
    }
    if (!jobApplicants[jobId].includes(studentId)) {
        jobApplicants[jobId].push(studentId);
        localStorage.setItem('jobApplicants', JSON.stringify(jobApplicants));
    }
    return jobApplicants;
}

function getApplicantsForJobFromAPI(jobId) {
    const jobApplicants = getJobApplicants();
    return jobApplicants[jobId] || [];
}

// ===== EXPORT FOR USE IN SCRIPT.JS =====
// Note: In a module system, you would use export, but for vanilla JS, 
// these functions are available globally when this script is loaded


