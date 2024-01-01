import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { UserCategorySchema } from "../Component/ValidationSchemas";
import Fetchdata, {
  FetchCategoryList,
  DeleteItems,
} from "../Component/FetchData";
import { BoxModel, handelCloseModelBox, handelOpenModelBox } from "../Component/BoxModel";
import { Buttons } from "../Component/Buttons";



const RegisterCategory = () => {
  useEffect(() => {
    handleCategoryList();
  }, []);

  const [CategoryList, setCategoryList] = useState([]);
  const [Mes, setMes] = useState()

  const handleCategoryList = async () => {
    const response = await FetchCategoryList();
    if (response && response.length > 0) {
      setCategoryList(response);
    } else {
      setMes('No Record Found ...')
      handelOpenModelBox("dialog");
    }
  };

  const handleAddCategory = async (data) => {
    const response = await Fetchdata(
      "POST",
      "http://localhost:8080/addcategory",
      data
    );
    if (response) {
      // alert(response.mes);
      setMes(response.mes)
      handelOpenModelBox("dialog");
      handleCategoryList();
    }
  };

  const handleDeleteCategory = async (ID) => {
    await DeleteItems(ID, "http://localhost:8080/deletecatgeory")
    handleCategoryList()
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
        // alert(response.mes);
        setMes(response.mes)
        handelOpenModelBox('dialog')
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
      <dialog className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm" id="dialog">
           <BoxModel mes={Mes} closeFunc={() => handelCloseModelBox("dialog")} />
      </dialog>
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
            <button className="btn btn-danger rounded-0" type="submit">Add New</button>
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
                      <div className="m-1 p-0 d-flex gap-2 justify-content-center flex-wrap">
                        <Buttons name={'Delete'} color={'danger'} func={() => handleDeleteCategory(key.ID)} />
                        {/* <Buttons name={'Update'} color={'primary'} func={() => handleUpdateCategory(key)} />     */}
                        <Buttons name={'Update'} color={'primary'} func={(e) => handleUpdateCategory(e, key)} />    

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
