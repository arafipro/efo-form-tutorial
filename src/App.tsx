import RequestForm from "./components/request-form";

export default function App() {
  return (
    <main className="flex flex-col min-h-screen items-center ">
      <h1 className="text-3xl font-bold">EFO フォーム Tutorial</h1>
      <div className="max-w-2xl w-full bg-gray-200 p-4 rounded-lg">
        <RequestForm />
      </div>
    </main>
  );
}
