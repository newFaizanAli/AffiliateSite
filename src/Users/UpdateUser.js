import React from 'react'
import { useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import { UpdateUserSchema } from '../Component/ValidationSchemas'
import Fetchdata from '../Component/FetchData'

const UpdateUser = () => {
  const location = useLocation()
  const Data = location.state ? location.state : '';
  
 

  const handleUpdate = async(data) => {
    try {
        const response = await Fetchdata("POST", "http://localhost:8080/updateuser",  {...data, ID : Data.ID} );
        if (response) {
          alert(response.mes)
        }
      } catch (e) {
          alert(e)
      }
  }

  const UpdateUserValues = {
    Name: Data.Name ? Data.Name : '',
    UserName: Data.UserName ? Data.UserName : '',
    Email: Data.Email ? Data.Email : '' ,
    Contact: Data.Contact ? Data.Contact : '',
  };

  const formik = useFormik({
    initialValues: UpdateUserValues,
    validationSchema: UpdateUserSchema,
    onSubmit: (values) => {
        handleUpdate(values)
    },
  });

  return (
    <>
      {
        Data ?
        <div className="row d-felx flex-wrap justify-content-center m-2">
        <div className="col-12 col-md-5 card shadow-lg p-2 text-center">
          <div className="p-3">
            <h2 className="h2"> Update User </h2>
          </div>
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
                    name="UserName"
                    onChange={formik.handleChange}
                    value={formik.values.UserName}
                  />
                  {formik.touched.UserName && formik.errors.UserName ? (
                    <div className="text-danger">{formik.errors.UserName}</div>
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
                <button className="btn btn-success rounded-0" type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div> : <div>Kindly Update User By selecting user from Users List, </div>}
    </>
  );
  
}

export default UpdateUser



