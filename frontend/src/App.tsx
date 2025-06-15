import DynamicForm from "./components/DynamicForm";
import Navbar from "./components/Navbar";
import SchemaField from "./components/SchemaField";

function App() {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="flex w-full h-full">
        <div className="w-1/2 h-screen bg-gray-200 border-8 border-gray-300">
          <SchemaField />
        </div>
        <div className="w-1/2 h-screen bg-gray-200 border-8 border-gray-300 overflow-scroll overflow-x-hidden">
          <DynamicForm />
        </div>
      </div>
    </div>
  );
}

export default App;
