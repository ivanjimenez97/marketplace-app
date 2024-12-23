import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axiosClient from "../../AxiosClient.js";
import { useAuthContext } from "../../contexts/AuthProvider.jsx";
import MdiLightViewDashboard from "../icons/MdiLightViewDashboard";
import UsersGroupSolid from "../icons/UsersGroupSolid";
import CommentsIcon from "../icons/CommentsIcon.jsx";
import { BoxesIcon } from "../icons/BoxesIcon.jsx";

export default function Navbar() {
  const { setUser, setToken } = useAuthContext();
  const [currentUser, setCurrentUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout").then((res) => {
      setUser({});
      setToken(null);
      console.log("Logout", res);
    });
  };

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("CURRENT_USER")));
  }, []);

  return (
    <header className="mb-20 md:mb-0">
      <nav className="bg-slate-700 md:bg-transparent shadow md:shadow-none fixed md:relative w-full top-0 z-50 left-0">
        <div className="md:hidden flex justify-between items-center p-3">
          <Link to={"/"} className="flex items-center">
            <span className="text-lg text-indigo-400 font-bold ml-2">
              Marketplace App
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-indigo-400 focus:outline-none"
            title="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden bg-slate-700 shadow-lg w-full">
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white flex items-center p-3"
                  : "text-gray-200 hover:bg-indigo-100 flex items-center p-3"
              }
            >
              <MdiLightViewDashboard className="w-6 h-6" />
              <span className="ml-3">Dashboard</span>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white flex items-center p-3"
                  : "text-gray-200 hover:bg-indigo-100 flex items-center p-3"
              }
            >
              <BoxesIcon className="w-6 h-6" />
              <span className="ml-3">Products</span>
            </NavLink>

            <NavLink
              to={"/users"}
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-500 text-white flex items-center p-3"
                  : "text-gray-200 hover:bg-indigo-100 flex items-center p-3"
              }
            >
              <UsersGroupSolid className="w-6 h-6" />
              <span className="ml-3">Users</span>
            </NavLink>
            <div className="profile px-3 py-1 bg-red-200 hover:bg-red-500 text-zinc-700">
              <p className=" font-semibold">
                {currentUser.firstName} {currentUser.lastName} &nbsp;
              </p>
              <Link to={"#"} onClick={onLogout} className=" hover:text-white">
                Logout
              </Link>
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <div className="hidden md:block profile px-3 py-1 text-zinc-700 hover:bg-indigo-500 hover:rounded-lg">
            <p className="text-zinc-700 font-semibold">
              {currentUser.firstName} {currentUser.lastName} &nbsp;
            </p>
            <Link
              to={"#"}
              onClick={onLogout}
              className="hover:text-white hover:font-medium"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
