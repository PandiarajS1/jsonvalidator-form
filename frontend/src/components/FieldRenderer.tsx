import React from "react";

interface FieldProps {
  name: string;
  fieldSchema: any;
  value: any;
  onChange: (name: string, value: any) => void;
  error: string;
}

const FieldRenderer: React.FC<FieldProps> = ({
  name,
  fieldSchema,
  value,
  onChange,
  error,
}) => {
  const { type } = fieldSchema;

  switch (type) {
    case "string":
    case "number":
      return (
        <div className="w-full flex flex-col m-3 pr-3">
          <label className="font-semibold mb-1">{name}</label>
          <input
            type={type === "number" ? "number" : "text"}
            name={name}
            value={value || ""}
            onChange={(e) =>
              onChange(
                name,
                type === "number" ? Number(e.target.value) : e.target.value
              )
            }
            className="bg-white rounded-md p-2"
          />
          {error && <p className="text-red-700 text-[12px] mt-1">{error}</p>}
        </div>
      );
    case "boolean":
      return (
        <div className="w-full flex flex-col m-3 pr-3">
          <label className="font-semibold mb-1 capitalize flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              checked={Boolean(value)}
              onChange={(e) => onChange(name, e.target.checked)}
            />
            {name}
          </label>
          {error && <p className="text-red-700 text-sm mt-1">{error}</p>}
        </div>
      );
    default:
      return <p>Unsupported field: {name}</p>;
  }
};

export default FieldRenderer;
