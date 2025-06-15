import { useEffect, useState } from "react";
import { useSchema } from "../context/SchemaContext";
import { uploadSchema } from "../api/api";
import { SampleFormSchemaString } from "../constants/constants";

const SchemaField = () => {
  const [schemaText, SetSchemaText] = useState("");
  const { schema, setSchema, setSchemaId } = useSchema();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSchema(schemaText);
      const response = await uploadSchema(JSON.parse(schemaText));
      setSchemaId(response._id);
    } catch (error) {
      alert("invalid JSON");
    }
  };

  useEffect(() => {
    SetSchemaText(schema);
  }, [schema]);

  return (
    <div className="w-full h-full flex flex-col p-2 m-2 pr-6">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="font-bold text-[18px]">Schema</h1>
          <p className="font-sans text-[14px]">enter your schema here</p>
        </div>
        <button
          onClick={() => SetSchemaText(SampleFormSchemaString)}
          className=" text-gray-100 mr-3 bg-fuchsia-800 p-2 mt-3 rounded-md font-semibold"
        >
          get sample schema
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full h-screen mt-2"
      >
        <textarea
          onChange={(e) => SetSchemaText(e.target.value)}
          value={schemaText}
          placeholder="Enter schema here..."
          className="bg-white rounded-md min-h-[500px] max-h-[550px] mt-2 p-2"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-800 text-gray-100 p-2 mt-3 rounded-md font-semibold"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default SchemaField;
