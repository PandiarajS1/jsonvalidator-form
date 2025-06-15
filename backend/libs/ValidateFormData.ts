const ValidateFormData = (
  schemaData: FormSchemaType,
  formData: Record<string, any>
): string[] => {
  // this array stores the errors that will be returned if the form data does not match the schema
  const errors: string[] = [];
  const schema: SchemaType = schemaData.Schema;
  const requiredFields = schema.required || [];
  const properties = schema.properties || {};

  if (schema.type !== "object") {
    errors.push("Schema type must be 'object'");
  }

  // Check if all required fields are present in the form data
  for (const field of requiredFields) {
    if (!((field as any) in formData))
      errors.push(`Field '${field}' is required`);
  }

  // Validate each field in the form data against the schema
  for (const [key, value] of Object.entries(formData)) {
    const fieldSchema = properties[key];
    if (!fieldSchema) {
      errors.push(`Field '${key}' does not exist in the schema`);
      continue;
    }

    const expectedType = fieldSchema.type;
    const actualType = typeof value;
    if (
      (expectedType === "string" && actualType !== "string") ||
      (expectedType === "number" && actualType !== "number") ||
      (expectedType === "boolean" && actualType !== "boolean")
    ) {
      errors.push(`Field '${key}' should be of type ${expectedType}`);
      continue;
    }

    // checking for data if its string
    if (expectedType == "string") {
      if (
        fieldSchema.minLength !== undefined &&
        value.length < fieldSchema.minLength
      ) {
        errors.push(
          `Field '${key}' should have a minimum length of ${fieldSchema.minLength}`
        );
      }
      if (
        fieldSchema.maxLength !== undefined &&
        value.length > fieldSchema.maxLength
      ) {
        errors.push(
          `Field '${key}' should not exceed the max length of ${fieldSchema.maxLength} characters`
        );
      }
      if (fieldSchema.pattern) {
        const regex = new RegExp(fieldSchema.pattern);
        if (!regex.test(value))
          errors.push(
            `${key} does not match the pattern: ${fieldSchema.pattern}`
          );
      }
    }

    // check for data if its number
    if (fieldSchema.type === "number") {
      if (fieldSchema.minimum !== undefined && value < fieldSchema.minimum) {
        errors.push(
          `Field '${key}' should be greater than or equal to ${fieldSchema.minimum}`
        );
      }
      if (fieldSchema.maximum !== undefined && value > fieldSchema.maximum) {
        errors.push(
          `Field '${key}' should be less than or equal to ${fieldSchema.maximum}`
        );
      }
    }

    // check for enum values
    if (fieldSchema.enum && !fieldSchema.enum.includes(value)) {
      errors.push(
        `Field '${key}' should be one of the following values: ${fieldSchema.enum.join(
          ", "
        )}`
      );
    }
  }

  return errors;
};

export default ValidateFormData;
