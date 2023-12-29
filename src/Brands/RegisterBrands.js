import React, { useState } from "react";
import Fetchdata, {
  FetchCategoryList,
  FetchUserList,
  FormDataFetch,
} from "../Component/FetchData";
import { RegisterBarndSchema } from "../Component/ValidationSchemas";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const RegisterBrands = () => {
  useState(() => {
    MainFunc();
  }, []);

  const [CategroyList, setCategroyList] = useState([]);
  const [UserList, setUserList] = useState([]);
  const [imgPath, setimgPath] = useState({});
  const Navigate= useNavigate()

  async function MainFunc() {
    await getCategory();
    await getUsers();
  }

  async function getCategory() {
    let items = await FetchCategoryList();
    if (items && items.length > 0) {
      setCategroyList(items);
    } else {
      alert("No Category Found Kindly Add Category");
    }
  }

  async function getUsers() {
    let items = await FetchUserList();
    if (items && items.length > 0) {
      setUserList(items);
    } else {
      alert("No Category Found Kindly Add Category");
    }
  }

  const addRegister = async (values) => {
    const formData = new FormData();
    formData.append("BrandName", values.BrandName);
    formData.append("BrandCountry", values.BrandCountry);
    formData.append("UserEmail", values.UserEmail);
    formData.append("CategoryName", values.CategoryName);
    formData.append("imgPath", imgPath);

  
    try {
      const response = await fetch("http://localhost:8080/registerbrand", {
        method: "POST",
        body: formData,
      }).then(res => res.json(res)).then(res => alert(res.mes)).then(() => Navigate('/brand'));
      
    } catch (e) {
      alert(e);
    }
  };

  const RegisterBarndValues = {
    BrandName: "",
    BrandIcon: "",
    BrandCountry: "",
    UserEmail: "",
    CategoryName: "",
  };

  const formik = useFormik({
    initialValues: RegisterBarndValues,
    validationSchema: RegisterBarndSchema,
    onSubmit: (values) => {
      addRegister(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row d-felx flex-wrap justify-content-center m-2">
          <div className="col-12 col-md-6 card shadow-sm p-2 text-center m-5">
            <div className="p-3">
              <h2 className="h2"> Register Brand </h2>
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
                    <div className="text-danger">{formik.errors.BrandName}</div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex justify-content-center p-2">
                <div className="col-8 shadow-sm">
                  <input
                    type="file"
                    className="form-control rounded-0"
                    name="BrandIcon"
                    accept="image/*"
                    placeholder="Your Icon"
                    // onChange={(e) => {
                    //   // setimgPath(URL.createObjectURL(e.target.files[0]));
                    //   // setimgPath(e.target.files[0]);
                    //   // formik.handleChange(e)}}
                    //   //  value={formik.values.BrandIcon
                    // }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setimgPath(file);
                      formik.setFieldValue("BrandIcon", file);
                    }}
                  />
                  {formik.touched.BrandIcon && formik.errors.BrandIcon ? (
                    <div className="text-danger">{formik.errors.BrandIcon}</div>
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
                  {formik.touched.BrandCountry && formik.errors.BrandCountry ? (
                    <div className="text-danger">
                      {formik.errors.BrandCountry}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex justify-content-center p-2">
                <div className="col-8">
                  <select
                    name="UserEmail"
                    className="form-control shadow-sm"
                    onChange={formik.handleChange}
                    value={formik.values.UserEmail}
                  >
                    <option className="dropdown-item" value="">
                      --Choose Person--
                    </option>
                    {UserList &&
                      UserList.map((key) => {
                        return (
                          <option
                            className="dropdown-item"
                            value={key.Email}
                            key={key.Email}
                          >
                            {key.Email}
                          </option>
                        );
                      })}
                  </select>
                  {formik.touched.UserEmail && formik.errors.UserEmail ? (
                    <div className="text-danger">{formik.errors.UserEmail}</div>
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
                    {CategroyList &&
                      CategroyList.map((key) => {
                        return (
                          <option
                            className="dropdown-item"
                            value={key.CategoryName}
                            key={key.ID}
                          >
                            {key.CategoryName}
                          </option>
                        );
                      })}
                  </select>
                  {formik.touched.CategoryName && formik.errors.CategoryName ? (
                    <div className="text-danger">
                      {formik.errors.CategoryName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex justify-content-center p-2">
                <div className="col-8">
                  <button className="btn btn-danger rounded-0" type="submit">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterBrands;
