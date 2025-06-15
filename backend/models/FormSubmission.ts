import mongoose from "mongoose";

const FormSubmission = new mongoose.Schema<FormSubmissionType>({
  Schema_id: {
    type: String,
    required: true,
  },
  form_data: {
    type: Object,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const SubmissionModel = mongoose.model("FormSubmission", FormSubmission);
export default SubmissionModel;
