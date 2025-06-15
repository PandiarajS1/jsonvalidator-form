import { useState } from "react";
import FieldRenderer from "./FieldRenderer";
import { submitFormData } from "../api/api";
import { useSchema } from "../context/SchemaContext";

const FormBuilder = ({ schema }: { schema: any }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { schemaId } = useSchema();

  const handleChange = (name: string, value: any) => {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    validateSingleField(name, value);
  };

  const validateSingleField = (fieldName: string, value: any) => {
    const rule = schema.properties?.[fieldName];
    const required = schema.required || [];
    const typedRules = rule as {
      type?: string;
      minLength?: number;
      maxLength?: number;
      minimum?: number;
      maximum?: number;
      enum?: any[];
      pattern?: string;
    };

    let error = "";

    if (required.includes(fieldName)) {
      if (value === undefined || value === null) {
        error = `${fieldName} is required`;
      }
    }

    if (schema.required?.includes(fieldName)) {
      const isEmpty =
        value === undefined ||
        value === null ||
        value === "" ||
        (typeof value === "number" && isNaN(value));

      if (isEmpty) error = `${fieldName} is required`;
    }

    if (typedRules?.type === "string" && typeof value === "string") {
      if (typedRules.minLength && value.length < typedRules.minLength) {
        error = `${fieldName} must be at least ${typedRules.minLength} characters`;
      } else if (typedRules.maxLength && value.length > typedRules.maxLength) {
        error = `${fieldName} must be less than ${typedRules.maxLength} characters`;
      }
      if (typedRules.pattern) {
        const regex = new RegExp(typedRules.pattern);
        if (!regex.test(value)) {
          error = `${fieldName} is invalid`;
        }
      }
    }

    if (typedRules?.type === "number" && typeof value === "number") {
      if (typedRules.minimum && value < typedRules.minimum) {
        error = `${fieldName} must be at least ${typedRules.minimum}`;
      } else if (typedRules.maximum && value > typedRules.maximum) {
        error = `${fieldName} must be at most ${typedRules.maximum}`;
      }
    }

    if (typedRules?.enum && !typedRules.enum.includes(value)) {
      error = `${fieldName} must be one of: ${typedRules.enum.join(", ")}`;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const required = schema.required || [];
    const properties = schema.properties || {};

    for (const field of required) {
      const val = formData[field];
      if (val === undefined || val === null) {
        errs[field] = `${field} is required`;
      }
      if (
        val === undefined ||
        val === null ||
        val === "" ||
        (typeof val === "number" && isNaN(val))
      ) {
        errs[field] = `${field} is required`;
      }
    }

    for (const [key, rules] of Object.entries(properties)) {
      const value = formData[key];

      const typedRules = rules as {
        type?: string;
        minLength?: number;
        maxLength?: number;
        minimum?: number;
        maximum?: number;
        enum?: any[];
        pattern?: string;
      };

      // Type-specific checks
      if (typedRules.type === "string") {
        if (
          value &&
          typedRules.minLength &&
          value.length < typedRules.minLength
        ) {
          errs[
            key
          ] = `${key} must be at least ${typedRules.minLength} characters`;
        }
        if (
          value &&
          typedRules.maxLength &&
          value.length > typedRules.maxLength
        ) {
          errs[
            key
          ] = `${key} must be less than ${typedRules.maxLength} characters`;
        }

        if (typedRules.pattern) {
          const regex = new RegExp(typedRules.pattern);
          if (!regex.test(value)) {
            errs[key] = `${key} is invalid`;
          }
        }
      }

      if (typedRules.type === "number") {
        if (value !== undefined && typeof value === "number") {
          if (typedRules.minimum !== undefined && value < typedRules.minimum) {
            errs[key] = `${key} must be at least ${typedRules.minimum}`;
          }
          if (typedRules.maximum !== undefined && value > typedRules.maximum) {
            errs[key] = `${key} must be at most ${typedRules.maximum}`;
          }
        }
      }

      if (typedRules.enum && !typedRules.enum.includes(value)) {
        errs[key] = `${key} must be one of: ${typedRules.enum.join(", ")}`;
      }
    }

    setErrors(errs);
    console.log("Errors:", errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Submitting:", formData);
    try {
      await submitFormData(schemaId, formData);
      alert("Form submitted successfully!");
    } catch (error: Error | any) {
      console.error(
        "Submission failed:",
        error.response?.data || error.message
      );
      alert("Form submission failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(schema.properties).map(([name, fieldSchema]) => (
        <FieldRenderer
          key={name}
          name={name}
          fieldSchema={fieldSchema as any}
          value={formData[name]}
          onChange={handleChange}
          error={errors[name]}
        />
      ))}

      <button
        type="submit"
        className="bg-blue-800 text-gray-100 p-2 mt-3 rounded-md font-semibold float-right"
      >
        Submit
      </button>
      <p>{schemaId ? "Schema ID: " + schemaId : schemaId.length}</p>
    </form>
  );
};

export default FormBuilder;
