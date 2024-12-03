import React from "react";
import { Link } from "react-router-dom";

export default function ProjectData() {
  return (
    <>
      <div className="title p-5 bg-danger">
        <Link to="/dashboard/projects">View All Projects</Link>
        <h3>Add new Project</h3>
      </div>
    </>
  );
}
