import express, { RequestHandler } from "express";
import {
  getSchemaWithData,
  postFormSchema,
} from "../controllers/formSchemaController";

const router = express.Router();

router.post("/", postFormSchema as unknown as RequestHandler);
router.get("/:schemaid", getSchemaWithData as unknown as RequestHandler);

export default router;
