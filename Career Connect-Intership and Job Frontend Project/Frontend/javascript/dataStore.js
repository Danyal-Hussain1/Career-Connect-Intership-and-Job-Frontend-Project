/* Local data store using localStorage
   Exposes async API-like functions on window for compatibility
*/
(function() {
    const KEY_STUDENTS = 'students';
    const KEY_COMPANIES = 'companies';
    const KEY_JOBS = 'jobs';
    const KEY_APPLIED = 'appliedJobs';
    const KEY_JOB_APPLICANTS = 'jobApplicants';

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

    function read(key) {
        try {
            return JSON.parse(localStorage.getItem(key) || 'null');
        } catch (e) {
            return null;
        }
    }

    function write(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('dataStore write error', e);
        }
    }

    function ensureDefaults() {
        if (!read(KEY_STUDENTS)) write(KEY_STUDENTS, DEFAULT_STUDENTS.slice());
        if (!read(KEY_COMPANIES)) write(KEY_COMPANIES, DEFAULT_COMPANIES.slice());
        if (!read(KEY_JOBS)) write(KEY_JOBS, DEFAULT_JOBS.slice());
        if (!read(KEY_APPLIED)) write(KEY_APPLIED, []);
        if (!read(KEY_JOB_APPLICANTS)) write(KEY_JOB_APPLICANTS, {});
    }

    // Public API (async to mimic remote calls)
    window.getStudents = async function() {
        ensureDefaults();
        return read(KEY_STUDENTS) || [];
    };

    window.getCompanies = async function() {
        ensureDefaults();
        return read(KEY_COMPANIES) || [];
    };

    window.getJobs = async function() {
        ensureDefaults();
        return read(KEY_JOBS) || [];
    };

    window.createStudent = async function(student) {
        ensureDefaults();
        const arr = read(KEY_STUDENTS) || [];
        const id = arr.length > 0 ? Math.max(...arr.map(s => s.id)) + 1 : 1;
        const created = Object.assign({ id }, student);
        arr.push(created);
        write(KEY_STUDENTS, arr);
        return created;
    };

    window.createCompany = async function(company) {
        ensureDefaults();
        const arr = read(KEY_COMPANIES) || [];
        const id = arr.length > 0 ? Math.max(...arr.map(c => c.id)) + 1 : 1;
        const created = Object.assign({ id }, company);
        arr.push(created);
        write(KEY_COMPANIES, arr);
        return created;
    };

    window.createJob = async function(job) {
        ensureDefaults();
        const arr = read(KEY_JOBS) || [];
        const id = arr.length > 0 ? Math.max(...arr.map(j => j.id)) + 1 : 1;
        const created = Object.assign({ id }, job);
        arr.push(created);
        write(KEY_JOBS, arr);
        return created;
    };

    window.updateStudent = async function(id, updates) {
        ensureDefaults();
        const arr = read(KEY_STUDENTS) || [];
        const idx = arr.findIndex(s => s.id === id);
        if (idx === -1) throw new Error('Student not found');
        arr[idx] = Object.assign({}, arr[idx], updates);
        write(KEY_STUDENTS, arr);
        return arr[idx];
    };

    window.updateCompany = async function(id, updates) {
        ensureDefaults();
        const arr = read(KEY_COMPANIES) || [];
        const idx = arr.findIndex(c => c.id === id);
        if (idx === -1) throw new Error('Company not found');
        arr[idx] = Object.assign({}, arr[idx], updates);
        write(KEY_COMPANIES, arr);
        return arr[idx];
    };

    // Applied jobs and applicants helpers
    window.getAppliedJobsFromAPI = function() {
        ensureDefaults();
        return read(KEY_APPLIED) || [];
    };

    window.addAppliedJob = function(jobId) {
        ensureDefaults();
        const arr = read(KEY_APPLIED) || [];
        if (!arr.includes(jobId)) {
            arr.push(jobId);
            write(KEY_APPLIED, arr);
        }
    };

    window.getApplicantsForJobFromAPI = function(jobId) {
        ensureDefaults();
        const map = read(KEY_JOB_APPLICANTS) || {};
        return map[jobId] || [];
    };

    window.addJobApplicant = function(jobId, studentId) {
        ensureDefaults();
        const map = read(KEY_JOB_APPLICANTS) || {};
        if (!map[jobId]) map[jobId] = [];
        if (!map[jobId].includes(studentId)) {
            map[jobId].push(studentId);
            write(KEY_JOB_APPLICANTS, map);
        }
    };

    // Expose an initialization function
    window.initializeLocalDataStore = function() {
        ensureDefaults();
    };

    // Initialize immediately
    ensureDefaults();
})();
