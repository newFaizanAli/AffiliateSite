import React from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { UpdateRegisterBrandSchema } from "../Component/ValidationSchemas";
import Fetchdata from "../Component/FetchData";

const UpdateBrand = () => {
  let location = useLocation();
  let categoryList = location.state.CategoryList;
  let data = location.state.key;

  let RegisterBrandValues = { ...data };

  const updateBrand = async (values) => {
    try {
      const response = await Fetchdata("POST", "http://localhost:8080/updatebrand",  values );
      if (response) {
         alert(response.mes)
      }
    } catch (e) { 
        alert(e)
    }
  };

  const formik = useFormik({
    initialValues: RegisterBrandValues,
    validationSchema: UpdateRegisterBrandSchema,
    onSubmit: (values) => {
      updateBrand(values)
    },
  });

  return (
    <>
      <div className="conatainer m-4">
        {data ? (
          <div className="card shadow-lg rounded-0 m-3 p-4">

            <form onSubmit={formik.handleSubmit}>
              <div className="row d-felx flex-wrap justify-content-center m-2">
                <div className="col-12 col-md-6 card shadow-sm p-2 text-center m-5">
                  <div className="p-3">
                    <h2 className="h2"> Update Brand </h2>
                  </div>

                  <div className="content_section">
                    <div className="d-flex justify-content-center p-2">
                      <div className="col-8 shadow-sm">
                        <input
                          type="text"
                          className="form-control rounded-0"
                          name="BrandName"
                          placeholder="Brand Name"
                          onChange={formik.handleChange}
                          value={formik.values.BrandName}
                        />
                        {formik.touched.BrandName && formik.errors.BrandName ? (
                          <div className="text-danger">
                            {formik.errors.BrandName}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center p-2">
                      <div className="col-8">
                        <select
                          name="BrandCountry"
                          className="form-control shadow-sm"
                          onChange={formik.handleChange}
                          value={formik.values.BrandCountry}
                        >
                          <option className="dropdown-item" value="">
                            --Choose an Country--
                          </option>
                          <option className="dropdown-item" value="Pakistan">
                            Pakistan
                          </option>
                        </select>
                        {formik.touched.BrandCountry &&
                        formik.errors.BrandCountry ? (
                          <div className="text-danger">
                            {formik.errors.BrandCountry}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center p-2">
                      <div className="col-8">
                        <input
                          name="UserEmail"
                          className="form-control shadow-sm"
                          onChange={formik.handleChange}
                          value={formik.values.UserEmail}
                        />

                        {formik.touched.UserEmail && formik.errors.UserEmail ? (
                          <div className="text-danger">
                            {formik.errors.UserEmail}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center p-2">
                      <div className="col-8">
                        <select
                          name="CategoryName"
                          className="form-control shadow-sm"
                          onChange={formik.handleChange}
                          value={formik.values.CategoryName}
                        >
                          <option className="dropdown-item" value="">
                            --Choose Category--
                          </option>
                          {categoryList &&
                            categoryList.map((key) => {
                              return (
                                <>
                                  <option
                                    className="dropdown-item"
                                    value={key.CategoryName}
                                    key={key.ID}
                                  >
                                    {key.CategoryName}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                        {formik.touched.CategoryName &&
                        formik.errors.CategoryName ? (
                          <div className="text-danger">
                            {formik.errors.CategoryName}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="m-5 text-center">
                      <button
                        className="btn btn-primary border-0 shadow-sm rounded-0"
                        type="submit"
                      >
                        Update Coupan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div>Kindly Select Brand from Brand Menu.</div>
        )}
      </div>
    </>
  );
};

export default UpdateBrand;
