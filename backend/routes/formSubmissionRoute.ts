import express, { RequestHandler } from "express";
import { postFormSubmission } from "../controllers/FormSubmissionController";

const router = express.Router();

router.post("/:schemaid", postFormSubmission as RequestHandler);

export default router;
