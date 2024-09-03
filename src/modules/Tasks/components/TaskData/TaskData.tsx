import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PROJECTSURLS,
  requestHeader,
  TASKSURLS,
  USERSSURLS,
} from "../../../../constants/URLS";

interface FormValues {
  title: string;
  description: string;
  employeeId: number;
  projectId: number;
}

export default function TaskData() {
  const [projectsList, setProjectsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const location = useLocation();

  const { taskData, type } = location.state ? location.state : "";

  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: { title: "", description: "", employeeId: 0, projectId: 0 },
  });
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

  let getAllUsers = async () => {
    try {
      let response = await axios.get(USERSSURLS.getUsersUrl, {
        headers: requestHeader,
      });

      setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProjects();
    getAllUsers();
  }, []);

  let onSubmit = async (data: FormValues) => {
    try {
      let response = await axios({
        method: type === "edit" ? "PUT" : "POST",
        url: type === "edit" ? TASKSURLS.updateUrl : TASKSURLS.addUrl,
        data: data,
        headers: requestHeader,
      });
      navigate("/dashboard/tasks");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  let navigate = useNavigate();
  return (
    <>
      <div className="title p-3">
        <h5 onClick={() => navigate("/dashboard/tasks")}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i> view all tasks
        </h5>
        {type === "edit" ? <h4>Update a Task</h4> : <h4>Add a New Task</h4>}
      </div>
      <form
        className="w-75 m-auto p-4 shadow-lg rounded-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-2">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
            value={type === "edit" ? taskData.title : ""}
          />
        </div>
        {errors.title && (
          <span className="text-danger">{errors.title.message}</span>
        )}
        <div className="mb-2">
          <label>Description</label>
          <textarea
            className="form-control"
            placeholder="Description"
            {...register("description", {
              required: "Description is required",
            })}
            value={type === "edit" ? taskData.description : ""}
          ></textarea>
        </div>
        {errors.description && (
          <span className="text-danger">{errors.description.message}</span>
        )}

        <div className="row">
          <div className="col-md-6">
            <div className="mb-2">
              <label>User</label>
              <select
                {...register("employeeId", { required: "User is required" })}
                className="form-control"
                value={type === "edit" ? taskData.employee.id : ""}
              >
                <option>choose</option>
                {usersList.map((user: any) => (
                  <option value={user.id}>{user.userName}</option>
                ))}
              </select>
            </div>
            {errors.employeeId && (
              <span className="text-danger">{errors.employeeId.message}</span>
            )}
          </div>
          <div className="col-md-6">
            <div className="mb-2">
              <label>Project</label>
              <select
                {...register("projectId", { required: "Project is required" })}
                className="form-control"
                value={type === "edit" ? taskData.project.id : ""}
              >
                <option>choose</option>

                {projectsList.map((project: any) => (
                  <option value={project.id}>{project.title}</option>
                ))}
              </select>
            </div>
            {errors.projectId && (
              <span className="text-danger">{errors.projectId.message}</span>
            )}
          </div>
        </div>

        <div className="btns d-flex justify-content-between">
          <button className="btn btn-outline-secondary rounded-5">
            cancel
          </button>
          <button className="btn btn-warning rounded-5">save</button>
        </div>
      </form>
    </>
  );
}
