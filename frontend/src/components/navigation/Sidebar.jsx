import { NavLink } from "react-router-dom";
import MdiLightViewDashboard from "../icons/MdiLightViewDashboard";
import UsersGroupSolid from "../icons/UsersGroupSolid";
import CommentsIcon from "../icons/CommentsIcon.jsx";
import { BoxesIcon } from "../icons/BoxesIcon.jsx";

export default function Sidebar() {
  return (
    <aside className="sidebar bg-slate-700 lg:w-[240px] min-h-screen hidden md:block">
      <NavLink
        to={"/dashboard"}
        className={({ isActive }) =>
          isActive
            ? "border-r-4 border-indigo-400 font-bold text-indigo-400 flex justify-center lg:justify-start items-center py-3 px-5"
            : "text-gray-200 hover:text-indigo-200 flex justify-center lg:justify-start items-center py-3 px-5"
        }
      >
        <MdiLightViewDashboard className="w-[1.75rem] h-[1.75rem]" />
        <span className="hidden lg:block px-3">Dashboard</span>
      </NavLink>

      <NavLink
        to={"/products"}
        className={({ isActive }) =>
          isActive
            ? "border-r-4 border-indigo-400 font-bold text-indigo-400 flex justify-center lg:justify-start items-center py-3 px-5"
            : "text-gray-200 hover:text-indigo-200 flex justify-center lg:justify-start items-center py-3 px-5"
        }
      >
        <BoxesIcon className="w-[1.75rem] h-[1.75rem]" />
        <span className="hidden lg:block px-3">Products</span>
      </NavLink>

      <NavLink
        to={"/users"}
        className={({ isActive }) =>
          isActive
            ? "border-r-4 border-indigo-400 font-bold text-indigo-400 flex justify-center lg:justify-start items-center py-3 px-5"
            : "text-gray-200 hover:text-indigo-200 flex justify-center lg:justify-start items-center py-3 px-5"
        }
      >
        <UsersGroupSolid className="w-[1.75rem] h-[1.75rem]" />
        <span className="hidden lg:block px-3">Users</span>
      </NavLink>
    </aside>
  );
}
