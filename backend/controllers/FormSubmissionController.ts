import { Request, Response } from "express";
import FormSchemaModel from "../models/FormSchema";
import ValidateFormData from "../libs/ValidateFormData";
import SubmissionModel from "../models/FormSubmission";
import { Error } from "mongoose";

export const postFormSubmission = async (req: Request, res: Response) => {
  try {
    const { schemaid } = req.params;
    const formData = req.body;

    if (!schemaid || !formData) {
      return res
        .status(400)
        .json({ error: "Schema_id and form_data are required" });
    }

    const schemaDetails = await FormSchemaModel.findById(schemaid);

    if (!schemaDetails)
      return res.status(404).json({ error: "Schema not found" });

    const errors = ValidateFormData(schemaDetails, formData);

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const newSubmission = new SubmissionModel({
      Schema_id: schemaid,
      form_data: formData,
      submittedAt: new Date(),
    });

    newSubmission
      .save()
      .then(() => {
        res
          .status(201)
          .json({ success: true, message: "Form Submitted Successfully" });
      })
      .catch((error) => {
        console.log("error in saving the newsubmission");
        res.status(500).json((error as Error).message);
      });
  } catch (error) {
    console.log("error in try block");
    res.status(500).json({ error });
  }
};
