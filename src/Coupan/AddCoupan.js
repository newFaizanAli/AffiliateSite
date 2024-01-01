import React, { useState } from "react";
import { useFormik } from "formik";
import { RegisterCoupanScehma } from "../Component/ValidationSchemas";
import { useLocation, useNavigate } from "react-router-dom";
import { FormDataFetch } from "../Component/FetchData";
import { Buttons } from "../Component/Buttons";
import { BoxModel, handelCloseModelBox, handelOpenModelBox } from "../Component/BoxModel";


const AddCoupan = () => {
  const [ICON, setIcon] = useState("");
  const location = useLocation();
  const [Mes, setMes] = useState('')
  const Data = location.state ? location.state.data : null;
  const Navigate = useNavigate();

  const RegisterCoupanValues = {
    // ICON: "",
    WebURL: "",
    BrandName: Data ? Data.BrandName : "",
    StartDate: "",
    ExpireDate: "",
    SaleAmount: "",
    CoupanName: "",
    CoupanCode: "",
    Month: "",
    Event: "",
    Category: Data ? Data.CategoryName : "",
  };


  const handleModelBox = (resp) => {
    setMes(resp)
    handelOpenModelBox('dialog')
  }


  const addCoupan = async (values) => {
    if (ICON) {
      let data = { ...values, ICON };
      const formData = new FormData();

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }
      try {
        await FormDataFetch(
          "http://localhost:8080/registercoupan",
          formData
        )
          .then((res) => handleModelBox(res.mes))
          .then(() => Navigate("/coupan/manage"));
      } catch (e) {
        alert(e);
      }
    } else {
      handleModelBox("Kinldy Add Coupan ICON");
    }
  };

  const formik = useFormik({
    initialValues: RegisterCoupanValues,
    validationSchema: RegisterCoupanScehma,
    onSubmit: (values) => {
      // SaveUser(values);
      addCoupan(values);
    },
  });

  return (
    <>
      <div className="head d-flex justify-content-between m-2">
        <div>
          <h3>Add Coupan </h3>
        </div>
        <Buttons name={'Add Brand'} color={'success'} func={() => Navigate("/brand/register")} />
      </div>
      <dialog className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm" id="dialog">
           <BoxModel mes={Mes} closeFunc={() => handelCloseModelBox("dialog")} />
         </dialog>
      <div className="conatainer m-4">
        {Data ? (
          <div className="card shadow-sm m-3 p-4">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex flex-wrap justify-content-center">
                <div className="row d-flex flex-wrap col-12 mt-2">
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Coupan Name</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control h-100 shadow-sm"
                        type="text"
                        name="CoupanName"
                        onChange={formik.handleChange}
                        value={formik.values.CoupanName}
                      />
                    </div>
                    {formik.touched.CoupanName && formik.errors.CoupanName ? (
                      <div className="text-danger">
                        {formik.errors.CoupanName}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Brand Name</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        name="BrandName"
                        className="form-control shadow-sm"
                        onChange={formik.handleChange}
                        value={formik.values.BrandName}
                        readOnly
                      />
                    </div>
                    {formik.touched.BrandName && formik.errors.BrandName ? (
                      <div className="text-danger">
                        {formik.errors.BrandName}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row d-flex flex-wrap col-12 mt-2">
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Coupan Code</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control h-100 shadow-sm"
                        type="text"
                        name="CoupanCode"
                        onChange={formik.handleChange}
                        value={formik.values.CoupanCode}
                      />
                    </div>
                    {formik.touched.CoupanName && formik.errors.CoupanName ? (
                      <div className="text-danger">
                        {formik.errors.CoupanName}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Category</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        name="Category"
                        className="form-control shadow-sm"
                        onChange={formik.handleChange}
                        value={formik.values.Category}
                        readOnly
                      />
                    </div>
                    {formik.touched.Category && formik.errors.Category ? (
                      <div className="text-danger">
                        {formik.errors.Category}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row d-flex flex-wrap col-12 mt-2">
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Start Date</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control h-100 shadow-sm"
                        type="date"
                        name="StartDate"
                        onChange={formik.handleChange}
                        value={formik.values.StartDate}
                      />
                    </div>
                    {formik.touched.StartDate && formik.errors.StartDate ? (
                      <div className="text-danger">
                        {formik.errors.StartDate}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Expire Date</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        className="form-control h-100 shadow-sm"
                        type="date"
                        name="ExpireDate"
                        onChange={formik.handleChange}
                        value={formik.values.ExpireDate}
                      />
                    </div>
                    {formik.touched.ExpireDate && formik.errors.ExpireDate ? (
                      <div className="text-danger">
                        {formik.errors.ExpireDate}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row d-flex flex-wrap col-12 mt-2">
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">WEB URL</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        name="WebURL"
                        className="form-control shadow-sm"
                        onChange={formik.handleChange}
                        value={formik.values.WebURL}
                      />
                    </div>
                    {formik.touched.WebURL && formik.errors.WebURL ? (
                      <div className="text-danger">{formik.errors.WebURL}</div>
                    ) : null}
                  </div>

                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Sale Amount</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        name="SaleAmount"
                        className="form-control shadow-sm"
                        onChange={formik.handleChange}
                        value={formik.values.SaleAmount}
                      />
                    </div>
                    {formik.touched.SaleAmount && formik.errors.SaleAmount ? (
                      <div className="text-danger">
                        {formik.errors.SaleAmount}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row d-flex flex-wrap col-12 mt-2">
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Month</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        name="Month"
                        type="month"
                        className="form-control shadow-sm"
                        onChange={formik.handleChange}
                        value={formik.values.Month}
                      />
                    </div>
                    {formik.touched.Month && formik.errors.Month ? (
                      <div className="text-danger">{formik.errors.Month}</div>
                    ) : null}
                  </div>

                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">Event</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        name="Event"
                        className="form-control shadow-sm"
                        onChange={formik.handleChange}
                        value={formik.values.Event}
                      />
                    </div>
                    {formik.touched.Event && formik.errors.Event ? (
                      <div className="text-danger">{formik.errors.Event}</div>
                    ) : null}
                  </div>
                </div>
                <div className="row d-flex flex-wrap col-12 mt-2">
                  <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                    <div className="col-lg-4 col-12">
                      <h6 className="h6 mt-2">ICON</h6>
                    </div>
                    <div className="col-lg-8 col-12">
                      <input
                        type="file"
                        className="form-control rounded-0"
                        name="ICON"
                        accept="image/*"
                        placeholder="Your Icon"
                        onChange={(e) =>
                          // setIcon(URL.createObjectURL(e.target.files[0]))
                          {
                            const file = e.target.files[0];
                            setIcon(file);
                          }
                        }
                      />
                    </div>
                    {formik.touched.Month && formik.errors.Month ? (
                      <div className="text-danger">{formik.errors.Month}</div>
                    ) : null}
                  </div>
                </div>
                <div className="m-5 text-center">
                  <button
                    className="btn btn-primary border-0 shadow-sm rounded-0"
                    type="submit"
                  >
                    Add New Coupan
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div>Kindly Add Coupan Through Manage Brand</div>
        )}
      </div>
    </>
  );
};

export default AddCoupan;
