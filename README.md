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
---

## ✨ Features & Key Files

### 🔧 JSON Schema Form Validation (Frontend)

- Dynamically renders form fields based on user-submitted JSON schema
- Performs frontend validation based on:
  - `type`, `required`
  - `pattern`, `enum`
  - `minLength`, `maxLength`
  - `minimum`, `maximum`

📁 Relevant Files:
- `frontend/src/App.jsx`: Main component with form and submission logic
- `frontend/src/components/FormRenderer.jsx`: Dynamically renders form fields from schema
- `frontend/src/utils/validator.js`: Schema-based validation logic

---

### 🔁 Backend Validation & Response (Node.js Express)

- Receives schema and validates data
- Returns structured error messages or success

📁 Relevant Files:
- `backend/index.js`: Main Express app
- `backend/routes/formSchemaRoute.js`: Route handler for POST `/formschema`
- `backend/validators/schemaValidator.js`: Core JSON schema validation logic

---

### 📁 Load Sample Schema

- A **sample JSON schema file** is provided in:
  
  ```
  frontend/src/assets/sampleSchema.json
  ```

- The form page includes a button to **load sample schema** directly into the editor for user convenience.

📁 Relevant File:
- `frontend/src/components/SchemaEditor.jsx`: Fetches and loads sample schema on user request

---

### 📤 Export Schema Feature

- Users can **export the currently edited JSON schema** as a downloadable `.json` file.

📁 Relevant Files:
- `frontend/src/components/ExportButton.jsx`: Handles file export logic
- Utilizes `FileSaver` or equivalent logic via `Blob` and `URL.createObjectURL`

---

### 🔄 Live Preview & Error Display

- Real-time form updates as schema changes
- Displays specific error messages under each invalid field
- Success message on valid submission

---

### 📡 API Endpoint

- **POST** `/formschema` at `https://jsonvalidator-form.onrender.com/formschema`
- Payload: `{ "Schema": { ... } }`
- Returns: `{ success: true | false, errors: [ ... ] }`

---

### 🧪 Try It Live

👉 [https://jsonvalidator-form.vercel.app](https://jsonvalidator-form.vercel.app)

Includes:
- Editable schema textarea
- Auto-filled sample schema button
- Export current schema
- Validation preview on submit

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

## 🧑‍💻 Author

- Built by [Pandiaraj S](https://github.com/PandiarajS1)

---

