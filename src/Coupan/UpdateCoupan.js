import React, { useState } from "react";
import { useFormik } from "formik";
import { RegisterCoupanScehma } from "../Component/ValidationSchemas";
import { useLocation } from "react-router-dom";
import Fetchdata from "../Component/FetchData";
import { BoxModel, handelCloseModelBox, handelOpenModelBox } from "../Component/BoxModel";


const UpdateCoupan = () => {

  const location = useLocation()
  const Data = location.state
  const [Mes, setMes] = useState('')

  const RegisterCoupanValues = {
    ...Data
  } 

  const handleUpdateCoupan = async(data) => {
   try{
     const response = await Fetchdata("POST", "http://localhost:8080/updatecoupan",  data );
    if (response) {
      setMes(response.mes)
      handelOpenModelBox('dialog') 
    }
  } catch (e) {
      alert(e)
  }
  }

  const formik = useFormik({
    initialValues: RegisterCoupanValues,
    validationSchema: RegisterCoupanScehma,
    onSubmit: (values) => {
      handleUpdateCoupan(values)
    },
  });


  return (
    <>
      <div className="conatainer m-4">
        {Data ? (
          <div className="card shadow-lg rounded-0 m-3 p-4">
            <div className="row d-flex flex-wrap col-12 m-3">
              <h4 className="h4">Update Coupan</h4>
            </div>
            <dialog className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm" id="dialog">
           <BoxModel mes={Mes} closeFunc={() => handelCloseModelBox("dialog")} />
         </dialog>
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
                
                <div className="m-5 text-center">
                  <button
                    className="btn btn-primary border-0 shadow-sm rounded-0"
                    type="submit"
                  >
                    Update Coupan
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
}

export default UpdateCoupan