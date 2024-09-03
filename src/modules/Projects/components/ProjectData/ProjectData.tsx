import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PROJECTSURLS, requestHeader } from "../../../../constants/URLS";
import { FormValues } from "../../../../interfaces/PROJECTRS";

export default function ProjectData() {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ defaultValues: { title: "", description: "" } });

  let onSubmit = async (data: FormValues) => {
    try {
      let response = await axios.post(PROJECTSURLS.addUrl, data, {
        headers: requestHeader,
      });
      navigate("/dashboard/projects");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  let navigate = useNavigate();
  return (
    <>
      <div className="title p-3">
        <h5 onClick={() => navigate("/dashboard/projects")}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i> view all
          projects
        </h5>
        <h4>Add a New Project</h4>
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
          ></textarea>
        </div>
        {errors.description && (
          <span className="text-danger">{errors.description.message}</span>
        )}

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
