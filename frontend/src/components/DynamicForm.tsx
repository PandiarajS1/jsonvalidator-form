import FormBuilder from "./FormSection";
import { useSchema } from "../context/SchemaContext";

const DynamicForm = () => {
  const { schema } = useSchema();

  return (
    <div className="w-full h-full flex flex-col p-2 m-2 pr-6">
      <h1 className="font-bold text-[18px]">Form</h1>
      <p className="font-sans text-[14px]">enter your details here</p>
      <div className="flex flex-col w-full h-full">
        {schema.length > 0 ? (
          <>
            <FormBuilder schema={JSON.parse(schema)} />
          </>
        ) : (
          <p className="w-full h-full flex items-center justify-center">
            no form has been generated...
          </p>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
