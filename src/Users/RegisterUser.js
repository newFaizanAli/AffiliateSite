import React, { useState } from "react";
import { useFormik } from "formik";
import { RegisterUserSchema } from "../Component/ValidationSchemas";
import Fetchdata from "../Component/FetchData";
import { BoxModel, handelOpenModelBox, handelCloseModelBox } from "../Component/BoxModel";


const RegisterUser = () => {
    
  const [Mes, setMes] = useState('')

  const handleModelBox = (resp) => {
    setMes(resp)
    handelOpenModelBox('dialog')
  }


  const SaveUser = async(data) => {
    try {
      const response = await Fetchdata("POST", "http://localhost:8080/registeruser",  data );
      if (response) {
        handleModelBox(response.mes)
      }
    } catch (e) {
        alert(e)
    }
  };

  
  const RegisterUserValues = {
    Name: "",
    Username: "",
    Email: "",
    Contact: "",
    Password: "",
  };

  const formik = useFormik({
    initialValues: RegisterUserValues,
    validationSchema: RegisterUserSchema,
    onSubmit: (values) => {
      SaveUser(values);
    },
  });

  return (
    <>


      <div className="row d-felx flex-wrap justify-content-center m-2">
        <div className="col-12 col-md-5 card shadow-lg p-2 text-center">
          <div className="p-3">
            <h2 className="h2"> SignUp User </h2>
          </div>
          <dialog className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm" id="dialog">
           <BoxModel mes={Mes} closeFunc={() => handelCloseModelBox("dialog")} />
          </dialog>
          <form onSubmit={formik.handleSubmit}>
            <div className="content_section">
              <div className="d-flex justify-content-center p-2">
                <div className="col-4">
                  <label htmlFor="">Your Name</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    name="Name"
                    onChange={formik.handleChange}
                    value={formik.values.Name}
                  />
                  {formik.touched.Name && formik.errors.Name ? (
                    <div className="text-danger">{formik.errors.Name}</div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex justify-content-center p-2">
                <div className="col-4">
                  <label htmlFor="">Your Username</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    name="Username"
                    onChange={formik.handleChange}
                    value={formik.values.Username}
                  />
                  {formik.touched.Username && formik.errors.Username ? (
                    <div className="text-danger">{formik.errors.Username}</div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex justify-content-center p-2">
                <div className="col-4">
                  <label htmlFor="">Your Email</label>
                </div>
                <div className="col-8">
                  <input
                    type="email"
                    className="form-control rounded-0"
                    name="Email"
                    onChange={formik.handleChange}
                    value={formik.values.Email}
                  />
                  {formik.touched.Email && formik.errors.Email ? (
                    <div className="text-danger">{formik.errors.Email}</div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex justify-content-center p-2">
                <div className="col-4">
                  <label htmlFor="">Your Contact</label>
                </div>
                <div className="col-8">
                  <input
                    type="number"
                    className="form-control rounded-0"
                    name="Contact"
                    onChange={formik.handleChange}
                    value={formik.values.Contact}
                  />
                  {formik.touched.Contact && formik.errors.Contact ? (
                    <div className="text-danger">{formik.errors.Contact}</div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex justify-content-center p-2">
                <div className="col-4">
                  <label htmlFor="">Your Password</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    name="Password"
                    onChange={formik.handleChange}
                    value={formik.values.Password}
                  />
                  {formik.touched.Password && formik.errors.Password ? (
                    <div className="text-danger">{formik.errors.Password}</div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex justify-content-center p-2">
                <button className="btn btn-success rounded-0" type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  
};

export default RegisterUser;
