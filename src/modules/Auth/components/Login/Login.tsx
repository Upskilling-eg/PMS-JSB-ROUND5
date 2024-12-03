import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../../../assets/images/PMS 3.svg";

import axios from "axios";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../context/authcontext";
import { loginData } from "../../../../interfaces/auth-interface";
import { AUTHURLS } from "../../../../constants/api/URLS";

export default function Login() {
  const navigate = useNavigate();
  let { saveLoginData }: any = useContext(AuthContext);
  //any super global data type

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: loginData) => {
    axios
      .post(`${AUTHURLS.loginUrl}`, data)
      .then((response: any) => {
        localStorage.setItem("token", response.data.token);
        saveLoginData();

        navigate("/dashboard");
      })
      .catch((error: any) => {
        alert("error");
      });
  };

  return (
    <div className="container-fluid auth-container ">
      <div className="row vh-100 d-flex justify-content-center align-items-center">
        <div className="col-lg-5 col-md-7 col-sm-9">
          <div className="py-4 rounded-2">
            <div className="logo-cont text-center">
              <img src={logo} className="w-50" alt="logo" />
            </div>
            <form
              className="form-container w-75 m-auto p-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <span>welcome to PMS</span>
              <h4 className="fw-bolder h6">Login</h4>

              <div className="form-group my-3 position-relative">
                <input
                  placeholder="Enter your E-mail"
                  className="form-control   mb-1"
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

              <div className="form-group my-3 position-relative">
                <input
                  placeholder="Password"
                  autoComplete="on"
                  className="form-control   mb-1"
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger">password is required</span>
                )}
              </div>

              <div className="form-group my-3 position-relative d-flex justify-content-between">
                <Link
                  to="/register"
                  className="text-white text-decoration-none"
                >
                  Registeration
                </Link>
                <Link
                  to="/forget-pass"
                  className="text-white text-decoration-none"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="form-group my-3">
                <button className="btn w-100">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
