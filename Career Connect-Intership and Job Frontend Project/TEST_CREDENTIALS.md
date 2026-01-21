# CareerConnect - Test Credentials

## ✅ System is Now WORKING!

### JSON Server Status
- ✅ Running on http://localhost:3001
- ✅ Database: db.json with sample data

### Test Login Credentials

#### Student Accounts
| Email | Password | CGPA | Skills |
|-------|----------|------|--------|
| danyal@example.com | danyal123 | 3.8 | JavaScript, React, Node.js, HTML, CSS |
| john@example.com | john123 | 3.5 | Python, Java, SQL |

#### Company Accounts
| Email | Password | Industry |
|-------|----------|----------|
| hr@techcorp.com | techcorp123 | Technology |
| hr@globalbrands.com | global123 | Marketing |

### Available Jobs
1. **Frontend Developer** (Tech Corp) - Full-Time - $80k-$120k
2. **Backend Developer** (Tech Corp) - Full-Time - $90k-$130k
3. **Marketing Intern** (Global Brands) - Internship - $20/hour
4. **Content Creator** (Global Brands) - Part-Time - $25/hour

---

## 🚀 How to Use

### To Start the Server:
```bash
npm run server
```
or
```bash
npm run dev
```

### To Create a New Account:
1. Go to Sign Up page
2. Fill in the form (make sure to use a new email)
3. Select your role (Student or Employer)
4. Click "Create Account"

### To Login:
1. Go to Login page
2. Enter email and password
3. Select your role
4. Click "Login"

---

## 📝 Fixed Issues
- ✅ Login/Signup functions now work without JSON Server errors
- ✅ localStorage fallback implemented
- ✅ Default data initialized on first load
- ✅ Added missing job fields (description, salary, postedDate)
- ✅ Error handling improved
- ✅ Role detection fixed (case-insensitive)

## 💾 Data Storage
- **Primary**: JSON Server (db.json)
- **Fallback**: Browser localStorage
- **Automatic Sync**: Changes saved to both locations

---

## ⚡ Quick Start
1. Open terminal in project root
2. Run: `npm run server`
3. Open `Frontend/index.html` in browser (can use Live Server extension)
4. Use credentials above to test login/signup
