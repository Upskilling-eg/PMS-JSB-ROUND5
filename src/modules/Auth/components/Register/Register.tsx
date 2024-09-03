import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/PMS 3.svg";

import axios from "axios";
import { ToastContainer } from "react-toastify";
import { AUTHURLS } from "../../../../constants/URLS";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    axios
      .post(`${AUTHURLS.registerUrl}/Users/Register`, data)
      .then((response: any) => {
        // getToastValue("success","register successsfully")
        navigate("/verify-user");
      })
      .catch((error: any) => {
        // getToastValue("error",error.response.data.message)
      });
  };

  return (
    <div className="auth-container container-fluid">
      <ToastContainer />
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 col-sm-9">
          <div className="py-4 rounded-2">
            <div className="logo-cont text-center">
              <img src={logo} className="w-50" alt="logo" />
            </div>
            <form
              className="form-container w-75 m-auto p-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <span>welcome to PMS</span>
              <h4 className="fw-bolder h6">Create New Account</h4>

              <div className="row my-2">
                <div className="col-md-6">
                  <div className="form-group my-3 position-relative">
                    <input
                      placeholder="Enter your userName"
                      className="form-control ps-4 mb-1"
                      type="text"
                      {...register("userName", {
                        required: true,
                      })}
                    />
                    {errors.userName && errors.userName.type === "required" && (
                      <span className="text-danger">userName is required</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group my-3 position-relative">
                    <input
                      placeholder="Enter your E-mail"
                      className="form-control ps-4 mb-1"
                      type="email"
                      {...register("email", {
                        required: true,
                        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      })}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className="text-danger">email is required</span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span className="text-danger">invalid email</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-md-6">
                  <div className="form-group my-3 position-relative">
                    <input
                      placeholder="Enter your Country"
                      className="form-control ps-4 mb-1"
                      type="text"
                      {...register("country", {
                        required: true,
                      })}
                    />
                    {errors.country && errors.country.type === "required" && (
                      <span className="text-danger">country is required</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group my-3 position-relative">
                    <input
                      placeholder="Enter your phone"
                      className="form-control ps-4 mb-1"
                      type="text"
                      {...register("phoneNumber", {
                        required: true,
                      })}
                    />
                    {errors.phoneNumber &&
                      errors.phoneNumber.type === "required" && (
                        <span className="text-danger">
                          phoneNumber is required
                        </span>
                      )}
                  </div>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-md-6">
                  <div className="form-group my-3 position-relative">
                    <input
                      placeholder="Password"
                      className="form-control ps-4 mb-1"
                      type="password"
                      {...register("password", {
                        required: true,
                      })}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <span className="text-danger">password is required</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group my-3 position-relative">
                    <input
                      placeholder="confirm Password"
                      className="form-control ps-4 mb-1"
                      type="password"
                      {...register("confirmPassword", {
                        required: true,
                      })}
                    />
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === "required" && (
                        <span className="text-danger">
                          confirmPassword is required
                        </span>
                      )}
                  </div>
                </div>
              </div>
              <div className="form-group my-3 position-relative d-flex justify-content-end">
                <Link to="/login" className="text-white text-decoration-none">
                  Login
                </Link>
              </div>

              <div className="form-group my-3">
                <button className="btn w-100">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
