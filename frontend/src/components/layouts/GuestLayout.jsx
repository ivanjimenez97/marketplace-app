// GuestLayout.jsx
// ***** This component is used to load the Login, SignUp, Forgot Password pages.

import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider.jsx";

export default function GuestLayout() {
  const { token } = useAuthContext();

  if (token) {
    return <Navigate to={"/"} />;
  }

  return (
    <div
      id="guestLayout"
      className="grid justify-items-center content-center h-screen px-3"
    >
      <Outlet />
    </div>
  );
}
