# LeadFlow — Lead Management System

A full-stack Lead Management System built as part of a Software Developer Intern assignment.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | MongoDB Atlas + Mongoose |
| Styling | Plain CSS (no external UI library) |

---

## Features

- Submit leads via a validated form (Name, Email, Phone, Source)
- Client-side validation with inline error messages
- Server-side validation before saving to the database
- All leads displayed in a sortable table (newest first)
- Delete leads with confirmation
- Mobile-responsive layout
- MongoDB Atlas as persistent database (bonus)

---

## Project Structure

```
lead-management-system/
├── client/              # React + Vite frontend
│   └── src/
│       ├── api/         # Fetch helpers (leads.js)
│       ├── components/  # LeadForm, LeadTable
│       ├── App.jsx
│       └── index.css
│
└── server/              # Node.js + Express backend
    ├── config/          # MongoDB connection
    ├── middleware/       # Validation, error handling
    ├── models/          # Mongoose Lead schema
    ├── routes/          # API routes
    └── server.js
```

---

## How to Run

### Prerequisites
- Node.js v18+
- A MongoDB Atlas account and cluster URI

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/lead-management-system.git
cd lead-management-system
```

### 2. Set up the backend
```bash
cd server
cp .env.example .env
# Edit .env and add your MONGO_URI
npm install
npm run dev
```

Server will start at **http://localhost:5000**

### 3. Set up the frontend
```bash
cd ../client
cp .env.example .env
npm install
npm run dev
```

Frontend will start at **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/leads` | Fetch all leads (newest first) |
| `POST` | `/api/leads` | Create a new lead |
| `DELETE` | `/api/leads/:id` | Delete a lead by ID |

### Example: POST /api/leads

**Request body:**
```json
{
  "name": "Arpit Kumar",
  "email": "arpit@example.com",
  "phone": "9876543210",
  "source": "Website"
}
```

**Success response (201):**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "...",
    "name": "Arpit Kumar",
    "email": "arpit@example.com",
    "phone": "9876543210",
    "source": "Website",
    "createdAt": "2024-07-01T10:30:00.000Z"
  }
}
```

---

## Validation Rules

| Field | Rule |
|---|---|
| Full Name | Required, min 2 characters |
| Email | Required, valid email format |
| Phone | Required, exactly 10 digits |
| Source | Required, one of: Website, Facebook, Google, Referral |

Validation runs on both the client (React) and server (Express middleware) layers.

##Project Overview

<img width="1920" height="911" alt="image" src="https://github.com/user-attachments/assets/cfc0aba1-e276-413e-94e8-99c05308c9b3" />

