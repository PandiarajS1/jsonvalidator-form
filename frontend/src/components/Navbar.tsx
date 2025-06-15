import { useState } from "react";
import { getSchemaAndDataById } from "../api/api";
import { useSchema } from "../context/SchemaContext";

const Navbar = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportedData, setExportedData] = useState<any>(null);

  const { schemaId, setSchema } = useSchema();

  const handleExport = async () => {
    if (!schemaId) {
      alert("No schema ID found. Please submit a schema first.");
      return;
    }
    try {
      const response = await getSchemaAndDataById(schemaId); // or your API call
      setExportedData(response);
      setShowExportModal(true);
    } catch (error) {
      alert("Failed to export data");
      console.error(error);
    }
  };

  return (
    <div className="w-full h-14 border-b-2 border-b-gray-300 flex p-3 justify-between items-center">
      <h3 className="font-bold text-sky-900 text-[18px]">
        JSON Schema Validator
      </h3>
      <div className="flex justify-between items-center ">
        <label
          htmlFor="jsonImport"
          className="bg-cyan-900 text-white py-1 px-3 mr-2 text-center rounded-md"
        >
          import
        </label>
        <input
          type="file"
          accept=".json"
          id="jsonImport"
          name="import"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
              const text = e.target?.result;
              if (typeof text === "string") {
                try {
                  JSON.parse(text);
                  setSchema(text);
                } catch (err) {
                  alert("Invalid JSON file");
                }
              }
            };
            reader.readAsText(file);
          }}
          className="hidden"
        />
        <button
          onClick={handleExport}
          className="bg-sky-700 text-white py-1 px-3 text-center rounded-md"
        >
          export
        </button>
        {showExportModal && exportedData && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-2xl rounded-lg shadow-lg p-6 relative">
              <h2 className="text-xl font-bold mb-4">Exported Schema + Data</h2>
              <textarea
                readOnly
                value={JSON.stringify(exportedData, null, 2)}
                className="w-full h-64 p-2 font-mono text-sm border border-gray-300 rounded resize-none"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(exportedData, null, 2)
                    );
                    alert("Copied to clipboard!");
                  }}
                  className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
