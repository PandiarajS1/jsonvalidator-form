import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { METHODS } from "http";
import connectDB from "./config/db";
import formSubmissionRoute from "./routes/formSubmissionRoute";
import formSchemaRoute from "./routes/formSchemaRoute";

dotenv.config();

const app = express();

// port configuration with 6469 as default
const port = process.env.PORT || 6469;
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// connected to mongoDB with both localhost and live mongodb database
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the backend server of jsonSchema Validator!");
});

app.use("/formsubmission", formSubmissionRoute);
app.use("/formschema", formSchemaRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`CORS enabled for origin: ${allowedOrigin}`);
});
