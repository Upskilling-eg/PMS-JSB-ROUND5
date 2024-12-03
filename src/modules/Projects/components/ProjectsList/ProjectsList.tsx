import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../constants/api";
import { PROJECTSURLS } from "../../../../constants/api/URLS";
import { useNavigate } from "react-router-dom";

interface projectData {
  id: number;
  title: string;
  description: string;
  task: object[];
}

export default function ProjectsList() {
  const navigate = useNavigate();
  const [projectsList, setProjectsList] = useState([]);

  const getAllProjects = async () => {
    try {
      let response = await axiosInstance.get(PROJECTSURLS.getAll);
      console.log(response.data.data);

      setProjectsList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <div className="title d-flex p-5 justify-content-between">
        <h3>Projects </h3>
        <button
          onClick={() => navigate("/dashboard/project-data")}
          className="btn btn-warning"
        >
          Add new project
        </button>
      </div>
      <div className="p-5">
        {projectsList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">No of Tasks</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectsList.map((project: projectData) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.task.length}</td>
                  <td>actions</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>no dataaaa</h2>
        )}
      </div>
    </>
  );
}
