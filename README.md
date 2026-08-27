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
- 📈 Progress tracking (planned)
- 🔐 User authentication (planned)

---

## Tech Stack

### Frontend
- React
- React Router
- Vite
- Tailwind CSS
- Axios
- Recharts

### Backend
- Python
- FastAPI
- Pydantic
- Uvicorn
- SQLAlchemy
- PostgreSQL

### AI
- Google Gemini API

---

## 📁 Project Structure

```
carbon-emission-ai/
├── backend/
│   ├── main.py
│   ├── schemas.py
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
|   |   └── main.jsx
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
pip install fastapi uvicorn pydantic
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
React Calculator
  ↓
Axios POST request
  ↓
FastAPI
  ↓
Pydantic validation
  ↓
Carbon calculation
  ↓
JSON response
  ↓
React Results Page
  ├── Emission Cards
  ├── Annual Total
  └── Emission Breakdown Chart
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

- [x] Tailwind CSS
- [ ] Improved mobile responsiveness
- [ ] Responsive charts
- [ ] Navbar refinements
- [ ] Cleaner component architecture
- [ ] Animations and transitions
- [ ] Additional UI polish

### Phase 3 — AI 🤖

- [ ] AI-powered personalized reduction tips
- [ ] What-if scenarios
- [ ] Personalized sustainability insights

### Phase 4 — Production 🚀

- [ ] Database integration
- [ ] User accounts
- [ ] Calculation history
- [ ] Deployment

## 🎯 Project Goal

Carbon Compass is designed to demonstrate a complete full-stack workflow using React, REST APIs, FastAPI, data validation, and data visualization, while providing a foundation for future AI, database, and deployment features.

## 📌 Current Status

**Phase 1 — Core Application: COMPLETE ✅**

The core application is functional. Mobile responsiveness and other visual refinements are intentionally carried into Phase 2.

---

## Developer

Parisa Abbas