import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-4xl font-semibold text-gray-900">404</h1>
      <p className="text-gray-500">This page doesn't exist.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-2 px-4 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
      >
        Back to home
      </button>
    </div>
  );
};

export default NotFound;