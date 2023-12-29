import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { UserCategorySchema } from "../Component/ValidationSchemas";
import Fetchdata, {
  FetchCategoryList,
  DeleteItems,
} from "../Component/FetchData";

const RegisterCategory = () => {
  useEffect(() => {
    handleCategoryList();
  }, []);

  const [CategoryList, setCategoryList] = useState([]);

  const handleCategoryList = async () => {
    const response = await FetchCategoryList();
    if (response && response.length > 0) {
      setCategoryList(response);
    } else {
      alert("No Record Found ... ");
    }
  };

  const handleAddCategory = async (data) => {
    const response = await Fetchdata(
      "POST",
      "http://localhost:8080/addcategory",
      data
    );
    if (response) {
      alert(response.mes);
      handleCategoryList();
    }
  };

  const handleDeleteCategory = async (ID) => {
    await DeleteItems(ID, "http://localhost:8080/deletecatgeory").then(
      handleCategoryList()
    );
  };

  const handleUpdateCategory = async (key) => {
    let updatedText = prompt("Enter Category .. ");
    if (
      updatedText &&
      updatedText.length > 0 &&
      updatedText !== key.CategoryName
    ) {
      const response = await Fetchdata(
        "POST",
        "http://localhost:8080/updatecategory",
        { CategoryName: updatedText, ID: key.ID }
      );
      if (response) {
        alert(response.mes);
        handleCategoryList();
      }
    }
  };

  const RegisterCategoryValues = {
    CategoryName: "",
  };

  const formik = useFormik({
    initialValues: RegisterCategoryValues,
    validationSchema: UserCategorySchema,
    onSubmit: (values) => {
      handleAddCategory(values);
      //   console.log(values);
    },
  });

  return (
    <>
      <div className="head d-flex justify-content-center m-2">
        <div>
          <h3>Manage Category </h3>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-center gap-2 m-2">
          <div>
            <input
              type="text"
              className="form-control rounded-0"
              name="CategoryName"
              placeholder="Your Category"
              onChange={formik.handleChange}
              // value={formik.values.CategoryName}
              defaultValue={formik.values.CategoryName}
            />
            {formik.touched.CategoryName && formik.errors.CategoryName ? (
              <div className="text-danger">{formik.errors.CategoryName}</div>
            ) : null}
          </div>
          <div>
            <button className="btn btn-danger rounded-0">Add New</button>
          </div>
        </div>
      </form>
      <div className="m-md-3 m-0">
        <table className="table shadow-sm table-bordered">
          <thead className="table-light text-center " key={"thead"}>
            <tr className="mb-2">
              <th scope="col">
                <h6 className="h6">Category Name</h6>
              </th>
              <th>
                <h6 className="h6">Option</h6>
              </th>
            </tr>
          </thead>

          <tbody className="border-light text-center" key={"tbody"}>
            {CategoryList &&
              CategoryList.map((key, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          name="CategoryName"
                          value={key.CategoryName}
                          placeholder={key.CategoryName}
                          readOnly
                        />
                      </div>
                    </td>
                    <td>
                      <div className="m-1 p-0">
                        <button
                          className="btn btn-outline-danger m-1 p-1 rounded-0"
                          onClick={() => handleDeleteCategory(key.ID)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-outline-primary p-1 m-1 rounded-0"
                          onClick={() => handleUpdateCategory(key)}
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RegisterCategory;