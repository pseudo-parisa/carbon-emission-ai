# 🌱 Carbon Emission AI

An AI-powered web application that calculates a user's carbon footprint and provides personalized sustainability recommendations using Google's Gemini API.

---

## Features

- 🏠 Landing page
- 🌍 Carbon footprint calculator
- 🤖 AI-generated sustainability advice
- 🚗 Transportation emissions
- 💡 Electricity emissions
- ✈️ Flight emissions
- 🥗 Diet-based emissions
- 🛍️ Shopping-based emissions
- 📊 Results dashboard
- 📊 Emission breakdown charts
- 🗄️ PostgreSQL calculation storage
- 📜 Calculation history
- 📈 History summary statistics
- 📉 Carbon footprint trend comparison
- 📈 Progress tracking 
- 🔐 User registration and authentication 
- 👤 User-specific calculation history

---

## Tech Stack

### Frontend
- React
- React Router
- Vite
- Custom CSS
- Axios
- Recharts

### Backend
- Python
- FastAPI
- Pydantic
- Uvicorn
- SQLAlchemy
- PostgreSQL
- Psycopg
- JWT Authentication
- Password Hashing

### AI
- Google Gemini API

---

## 📁 Project Structure

```
carbon-emission-ai/
├── backend/
│   ├── main.py
│   ├── schemas.py
│   ├── models.py
│   ├── database.py
│   ├── auth.py
│   ├── ai_service.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```
---

## ⚙️ Getting Started

### Backend

From the `backend` directory:

```bash
python -m venv .venv
```

**Git Bash:**

```bash
source .venv/Scripts/activate
```

**PowerShell:**

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the backend `backend` directory and add your Gemini API key and database configuration:

```env
GEMINI_API_KEY=your_api_key_here
DATABASE_URL=postgresql+psycopg://postgres:your_password@localhost:5432/carbon_compass
```

Start the API:

```bash
uvicorn main:app --reload
```

The API runs at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

### Frontend

Open a second terminal and enter the frontend directory:

```bash
npm install
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

## 🔄 Application Flow

```text
User
  ↓
Register / Login
  ↓
JWT Authentication
  ↓
React Application
  ↓
React Calculator
  ↓
Axios POST request
  ↓
FastAPI
  ↓
Authenticated User
  ↓
Pydantic validation
  ↓
Carbon Calculation
  ↓
SQLAlchemy
  ↓
PostgreSQL
  ↓
User-linked Calculation
  ↓
JSON response
  ↓
React Results Page
  ├── Emission Cards
  ├── Annual Total
  ├── Emission Breakdown Chart
  │
  └── AI Recommendation Request
          ↓
      FastAPI AI Endpoint
          ↓
       Gemini API
          ↓
  Personalized Recommendations
          ↓
      React Results Page


Calculation History Flow

PostgreSQL
    ↓
FastAPI GET /calculations
    ↓
React History Page
    ├── Saved Calculations
    ├── Summary Statistics
    └── Carbon Trend Comparison
```

**Transportation**
```text
car distance x 0.192
```

**Electricity**
```text
monthly electricity × 12 × 0.4
```

**Flights**
```text
flights per year × 250
```

**Diet**

| Diet | Annual emissions |
|---|---:|
| Vegetarian | 1,500 kg CO₂ |
| Mixed | 2,200 kg CO₂ |
| Heavy Meat | 3,300 kg CO₂ |

**Shopping**

| Level | Annual emissions |
|---|---:|
| Low | 200 kg CO₂ |
| Medium | 500 kg CO₂ |
| High | 900 kg CO₂ |

The total is calculated by adding transportation, electricity, flights, diet, and shopping emissions.

> These are simplified project assumptions for educational purposes, not professional carbon-accounting measurements.

## 🗄️ Database

Carbon Compass uses PostgreSQL with SQLAlchemy to persist completed carbon footprint calculations.

### User Accounts

Each user account stores:

- User ID
- Email
- Password hash
- Account creation timestamp

## Calculations

Each calculation stores:

- Transportation emissions
- Electricity emissions
- Flight emissions
- Diet emissions
- Shopping emissions
- Total emissions
- Calculation timestamp

The backend provides a calculation retrieval endpoint:

```text
GET /calculations
```
The frontend uses this data to display saved calculation history and compare recent carbon footprint results.

## 🤖 AI Features

Google Gemini is integrated into the backend to provide:

### Personalized Reduction Recommendations

Recommendations are generated based on the user's calculated emission breakdown.

### Sustainability Insights

The application also generates personalized insights that interpret the user's overall emission pattern and identify areas of focus.

### What-If Scenarios

Planned for a future phase.

## 📜 Calculation History

Users can view previously saved carbon footprint calculations through the History page.

The History page provides:

- Saved calculation dates
- Total carbon footprint
- Emission category breakdowns
- Number of saved calculations
- Latest carbon footprint
- Average carbon footprint
- Comparison between the latest and previous calculation

Calculations are retrieved from PostgreSQL through the FastAPI backend.

## 🔐 Authentication

Carbon Compass supports user registration and JWT-based authentication.

Users can:

- Create an account
- Log in securely
- Receive a JWT access token
- Access authenticated calculation endpoints
- Store calculations under their user account

Passwords are hashed before being stored in PostgreSQL rather than being stored as plaintext.

The frontend automatically includes the JWT in authenticated API requests using Axios.

## ✅ Validation & Testing

The application includes:

- Empty-field validation
- Negative-value validation
- Maximum car-distance validation
- Maximum electricity-usage validation
- Maximum flight validation
- Pydantic backend validation
- Frontend/backend integration testing
- Backend-unavailable testing
- Results-page navigation testing
- Chart rendering testing
- Calculation/data consistency checks
- User registration testing
- Duplicate account validation
- Login authentication testing
- JWT-protected endpoint testing
- User-specific calculation retrieval

The API can be tested through FastAPI's `/docs` interface or Thunder Client.

## 🚨 API Error Handling

If the FastAPI backend is unavailable, the frontend displays a user-friendly error message and keeps the user on the calculator instead of navigating to an invalid results page.

## 🗺️ Roadmap

### Phase 1 — Core Application ✅

- [x] React frontend
- [x] FastAPI backend
- [x] Frontend/backend integration
- [x] Routing
- [x] Calculator
- [x] Results page
- [x] Charts
- [x] Frontend validation
- [x] Backend validation
- [x] Landing page
- [x] API unavailable handling
- [x] Calculation/data accuracy audit

### Phase 2 — Polish 🔄

- [x] Improved mobile responsiveness
- [x] Responsive charts
- [x] Navbar refinements
- [x] Cleaner component architecture
- [x] Animations and transitions
- [x] Accessibility 
- [x] Additional UI polish

### Phase 3 — AI 🤖

- [x] AI-powered personalized reduction tips
- [x] Personalized sustainability insights

### Phase 4 — Production 🚀

- [x] PostgreSQL database integration
- [x] SQLAlchemy database foundation
- [x] Calculation persistence 
- [x] Calculation retrieval API
- [x] Frontend calculation history
- [x] History summary statistics 
- [x] Carbon footprint trend
- [x] User accounts
- [x] User-specific calculation history
- [x] Long-term carbon tracking
- [x] Annual carbon trends
- [ ] Deployment

## 🎯 Project Goal

Carbon Compass is designed to demonstrate a complete full-stack workflow using React, REST APIs, FastAPI, data validation, data persistence, PostgreSQL, SQLAlchemy, AI integration, and data visualization.

The project provides a foundation for personalized sustainability insights, user accounts, long-term carbon tracking, and future deployment.

## 📌 Current Status

**Phase 1 — Core Application: COMPLETE ✅**

The core application is functional. Mobile responsiveness and other visual refinements are intentionally carried into Phase 2.

**Phase 2 — Polish: COMPLETE ✅**

The application has been refined with improved desktop UI, responsive layouts, mobile optimization, animations and transitions, and overall visual improvements.

**Phase 3 — AI: COMPLETE ✅**

Gemini AI has been integrated into the backend to provide personalized carbon reduction recommendations and sustainability insights based on the user's calculated emissions. What-if scenarios are planned for later.

---

## Developer

Parisa Abbas