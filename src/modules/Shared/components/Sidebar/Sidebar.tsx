import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/PMS 3.svg";
import { AuthContext } from "../../../../context/authcontext";

export default function SideBar() {
  let { loginData }: any = useContext(AuthContext);

  let [isCollapsed, setIsCollapsed] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  let navigate = useNavigate();
  let logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem
            className="logo-toggle d-flex justify-content-center"
            onClick={handleToggle}
            icon={
              isCollapsed ? (
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
              ) : (
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              )
            }
          ></MenuItem>
          <MenuItem
            icon={<i className="fa fa-home" aria-hidden="true"></i>}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          {loginData?.userGroup == "Manager" ? (
            <MenuItem
              icon={<i className="fa fa-users" aria-hidden="true"></i>}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>
          ) : (
            ""
          )}

          <MenuItem
            icon={<i className="fa fa-project-diagram" aria-hidden="true"></i>}
            component={<Link to="/dashboard/projects" />}
          >
            Projects
          </MenuItem>

          <MenuItem
            icon={<i className="fa fa-tasks" aria-hidden="true"></i>}
            component={<Link to="/dashboard/tasks" />}
          >
            Tasks
          </MenuItem>

          <MenuItem
            onClick={handleShow}
            icon={<i className="fa fa-key" aria-hidden="true"></i>}
          >
            Change Password
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            onClick={logOut}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
