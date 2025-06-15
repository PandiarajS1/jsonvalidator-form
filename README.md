# JSON Validator Form

A full-stack web application that validates JSON schema-based forms and renders dynamic validation. Users can define a schema, submit form data, and view validation errors in real-time.

🔗 **Live Demo**: [https://jsonvalidator-form.vercel.app](https://jsonvalidator-form.vercel.app)

---

## ✨ Features

- Create and submit a form schema using JSON
- Dynamically renders form fields from schema
- Validates user input based on schema rules
- Real-time error display
- Backend validation and response handling
- Deployed with:
  - Frontend on [Vercel](https://vercel.com/)
  - Backend on [Render](https://render.com/)

---

## 🧠 Project Overview

This app allows users to define a `JSON Schema` to validate forms. When the form is submitted, the schema and data are sent to the backend for validation. The backend responds with success or error messages.

The schema must follow standard [JSON Schema](https://json-schema.org/) format using keywords like:
- `type`
- `required`
- `properties`
- `minLength`, `maxLength`
- `enum`
- `pattern`
- `minimum`, `maximum`

---

## 📦 Technologies Used

- **Frontend**: React, Axios, Vite
- **Backend**: Node.js, Express, CORS, body-parser
- **Deployment**: Vercel (frontend), Render (backend)

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js installed
- Git installed

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/jsonvalidator-form.git
cd jsonvalidator-form

---

### 2. Run the Backend

cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
ALLOWED_ORIGINS=http://localhost:5173
```

Start the backend server:

```bash
npm start
```

> The backend will run at `http://localhost:5000`

---

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

> The frontend will run at `http://localhost:5173`

Make sure your backend is running before submitting the form from the frontend.

---

## ✅ Sample Valid Schema

Here's a sample of a valid schema that your app accepts:

```json
{
  "type": "object",
  "required": ["fullName", "email", "password", "age", "gender", "phone", "country", "agreeToTerms"],
  "properties": {
    "fullName": {
      "type": "string",
      "minLength": 3,
      "maxLength": 50
    },
    "email": {
      "type": "string",
      "pattern": "^[\\w.-]+@[\\w-]+\\.[a-zA-Z]{2,}$"
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "pattern": "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*]).{8,}$"
    },
    "confirmPassword": {
      "type": "string",
      "minLength": 8
    },
    "age": {
      "type": "number",
      "minimum": 18,
      "maximum": 99
    },
    "gender": {
      "type": "string",
      "enum": ["Male", "Female", "Other"]
    },
    "phone": {
      "type": "string",
      "pattern": "^\\d{10}$"
    },
    "country": {
      "type": "string",
      "enum": ["India", "USA", "Canada", "UK", "Australia"]
    },
    "newsletter": {
      "type": "boolean"
    },
    "agreeToTerms": {
      "type": "boolean"
    }
  }
}
```

---

## 📂 Folder Structure

```
jsonvalidator-form/
│
├── backend/           → Express.js backend
│   └── index.js       → Main server file
│
├── frontend/          → React frontend (Vite)
│   └── src/           → Components and logic
│
└── README.md
```

---

## 🧪 API Endpoint

**POST** `/formschema`

- **URL**: `https://jsonvalidator-form.onrender.com/formschema`
- **Payload**: `{ "Schema": { ...your schema... } }`
- **Returns**: JSON response with validation result

---

## 🧑‍💻 Author

- Built by [Pandiaraj S](https://github.com/PandiarajS1)

---

