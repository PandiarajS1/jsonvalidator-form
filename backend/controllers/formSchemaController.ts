import { randomUUID } from "crypto";
import { Request, Response } from "express";
import FormSchemaModel from "../models/FormSchema";
import SubmissionModel from "../models/FormSubmission";

export const postFormSchema = async (req: Request, res: Response) => {
  try {
    const { Schema } = req.body;
    const _id = ("form-id-" + randomUUID()) as string;

    if (!Schema) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // creating a new schema object
    const newSchema: FormSchemaType = {
      _id,
      Schema,
      createdAt: new Date(),
    };

    // Save the new schema to the database as FormSchema
    const FormSchema = await FormSchemaModel.insertOne(newSchema);

    return res.status(201).json({
      message: "Schema created successfully",
      _id: FormSchema._id,
    });
  } catch (error) {
    console.error("Error in postFormSchema:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getSchemaWithData = async (req: Request, res: Response) => {
  const { schemaid } = req.params;

  try {
    const schema = await FormSchemaModel.findById(schemaid);
    if (!schema) {
      return res.status(404).json({ error: "Schema not found" });
    }

    const dataSubmission = await SubmissionModel.findOne({
      Schema_id: schema._id,
    });
    const data = dataSubmission?.form_data;

    const formSchemaWithDataType: FormSchemaWithDataType = {
      schemaId: schema._id,
      schema: schema.Schema,
      data,
    };

    return res.status(200).json(formSchemaWithDataType);
  } catch (error) {
    console.error("Error in getSchemaWithData:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
