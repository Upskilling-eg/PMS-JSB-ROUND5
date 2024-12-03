import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/PMS 3.svg";

import axios from "axios";
import { ToastContainer } from "react-toastify";
// import { AUTHURLS } from "../../../../constants/URLS";

export default function RequestReset() {
  // const navigate = useNavigate();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = (data: any) => {
  //   axios
  //     .post(`${AUTHURLS.forgetUrl}/Users/Reset/Request`, data)
  //     .then((response: any) => {
  //       // getToastValue("success","mail sent successsfully")
  //       navigate("/reset-password");
  //     })
  //     .catch((error: any) => {
  //       // getToastValue("error",error.response.data.message)
  //     });
  // };
  // return (
  //   <div className="container-fluid auth-container ">
  //     <ToastContainer />
  //     <div className="row vh-100 d-flex justify-content-center align-items-center">
  //       <div className="col-lg-5 col-md-7 col-sm-9">
  //         <div className="py-4 rounded-2">
  //           <div className="logo-cont text-center">
  //             <img src={logo} className="w-50" alt="logo" />
  //           </div>
  //           <form
  //             className="form-container w-75 m-auto p-3"
  //             onSubmit={handleSubmit(onSubmit)}
  //           >
  //             <span>welcome to PMS</span>
  //             <h4 className="fw-bolder h6">Forget Password</h4>

  //             <div className="form-group my-3 position-relative">
  //               <input
  //                 placeholder="Enter your E-mail"
  //                 className="form-control   mb-1"
  //                 type="email"
  //                 {...register("email", {
  //                   required: true,
  //                   pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
  //                 })}
  //               />
  //               {errors.email && errors.email.type === "required" && (
  //                 <span className="text-danger">email is required</span>
  //               )}
  //               {errors.email && errors.email.type === "pattern" && (
  //                 <span className="text-danger">invalid email</span>
  //               )}
  //             </div>

  //             <div className="form-group my-3">
  //               <button className="btn w-100">Forget Password</button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
