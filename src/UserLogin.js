import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { UserLoginSchema } from "./Component/ValidationSchemas";
import Fetchdata from "./Component/FetchData";
import { UserRoleContext } from "./Component/ContextFile";

const UserLogin = () => {
  const Navigate = useNavigate();
  const {  login } = useContext(UserRoleContext);


  const handleLogin = async (data) => {
    console.log('runss ..');
    try {
      const response = await Fetchdata(
        "POST",
        "http://localhost:8080/userlogin",
        data
      );
      if (response.success){
        login()
        Navigate("/");
      }
      else alert(response.mes);
    } catch (e) {
      alert(e);
    }
  };

  const UserLoginValues = {
    Email: "",
    Password: "",
  };

  const formik = useFormik({
    initialValues: UserLoginValues,
    validationSchema: UserLoginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="col-12 col-md-5 card shadow-lg p-2 text-center">
        <div className="p-3">
          <h2 className="h2">Sign In</h2>
        </div>
       
        <div className="content_section">
          <div className="d-flex justify-content-center p-2">
            <div className="col-8">
              <input
                type="email"
                className="form-control rounded-0"
                name="Email"
                placeholder="Your Email"
                onChange={formik.handleChange}
                value={formik.values.Email}
              />
              {formik.touched.Email && formik.errors.Email ? (
                <div className="text-danger">{formik.errors.Email}</div>
              ) : null}
            </div>
          </div>
          <div className="d-flex justify-content-center p-2">
            <div className="col-8">
              <input
                type="password"
                className="form-control rounded-0"
                name="Password"
                placeholder="Your Password"
                onChange={formik.handleChange}
                value={formik.values.Password}
              />
              {formik.touched.Password && formik.errors.Password ? (
                <div className="text-danger">{formik.errors.Password}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="pb-3">
          <div className="signin-btn">
            <button
              className="btn btn-danger rounded-0 col-8 mt-1"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
};

export default UserLogin;
