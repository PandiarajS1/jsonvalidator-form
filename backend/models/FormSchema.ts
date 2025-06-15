import mongoose from "mongoose";

const FormSchema = new mongoose.Schema<FormSchemaType>(
  {
    _id: {
      type: String,
      required: true,
    },
    Schema: {
      type: Object,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const FormSchemaModel = mongoose.model("JsonSchema", FormSchema);

export default FormSchemaModel;
