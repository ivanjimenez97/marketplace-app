import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className=" grid justify-center content-center h-screen text-center">
      <h2 className="text-center font-bold text-gray-700 text-3xl mb-5">
        404 - Page Not Found!
      </h2>

      <button
        onClick={() => navigate(-1)}
        className="hover:cursor font-medium text-indigo-400 hover:text-indigo-700"
      >
        Go Back
      </button>
    </div>
  );
}
