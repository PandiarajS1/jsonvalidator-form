type FormSchemaType = {
  _id: string;
  Schema: SchemaType;
  createdAt: Date;
};

type FormSubmissionType = {
  Schema_id: string;
  form_data: Record<string, any>;
  submittedAt: Date;
};

interface SchemaType {
  type: string;
  properties: Record<string, JsonFieldSchema>;
  required?: String[];
}

type JsonSchemaType = "string" | "number" | "boolean";

interface JsonFieldSchema {
  type: JsonSchemaType;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  pattern?: string;
  enum?: string[];
}

type FormSchemaWithDataType = {
  schemaId: string;
  schema: SchemaType;
  data: Record<string, any> | undefined;
};
