import axios from "axios";
import React, { useEffect, useState } from "react";
import { PROJECTSURLS, requestHeader } from "../../../../constants/URLS";
import { useNavigate } from "react-router-dom";

export default function ProjectsList() {
  const [projectsList, setProjectsList] = useState([]);
  let navigate = useNavigate();
  let getAllProjects = async () => {
    try {
      let response = await axios.get(PROJECTSURLS.getAll, {
        headers: requestHeader,
      });
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
      <div className="title d-flex px-4 py-2 justify-content-between align-items-center">
        <h5>Projects</h5>
        <button
          onClick={() => navigate("/dashboard/project-data")}
          className="btn btn-warning px-3 py-2 rounded-5"
        >
          Add new project
        </button>
      </div>
      <div className="p-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">No of tasks</th>
              <th scope="col">Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projectsList.length > 0 ? (
              projectsList.map((project: any) => (
                <tr>
                  <th scope="row">{project.id}</th>
                  <td>{project.title}</td>
                  <td>{project.task.length}</td>
                  <td>{project.description}</td>
                  <td>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                    <i className="fa fa-edit mx-2" aria-hidden="true"></i>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </td>
                </tr>
              ))
            ) : (
              <h1>no dataaa</h1>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
