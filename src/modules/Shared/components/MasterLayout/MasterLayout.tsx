import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";

export default function MasterLayout() {
  return (
    <>
      <NavBar />

      <div className="d-flex">
        <div className="sidebar-cont">
          <SideBar />
        </div>

        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </>
  );
}
