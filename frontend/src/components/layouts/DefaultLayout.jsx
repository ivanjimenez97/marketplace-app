// DefaultLayout.jsx
// ***** This component is used to load The modules inside the application:
//       Dashboard, Companies, branches, Users, etc.

import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import Sidebar from "../navigation/Sidebar";
import Navbar from "../navigation/Navbar";

export default function DefaultLayout() {
  const { token } = useAuthContext();

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div id="defaultLayout" className="">
      <div className="">
        <Sidebar />
      </div>
      <main className="content px-3 lg:px-7">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
