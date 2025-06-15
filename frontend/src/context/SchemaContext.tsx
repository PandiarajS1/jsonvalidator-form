import React, { createContext, useContext, useState } from "react";

interface SchemaContextType {
  schema: any;
  setSchema: (schema: any) => void;
  schemaId: string;
  setSchemaId: (schemaId: string) => void;
}

const SchemaContext = createContext<SchemaContextType | undefined>(undefined);

export const SchemaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [schema, setSchema] = useState<string>("");
  const [schemaId, setSchemaId] = useState<string>("");
  return (
    <SchemaContext.Provider
      value={{ schema, setSchema, schemaId, setSchemaId }}
    >
      {children}
    </SchemaContext.Provider>
  );
};

export const useSchema = () => {
  const context = useContext(SchemaContext);
  if (!context) throw new Error("useSchema must be used within SchemaProvider");
  return context;
};
