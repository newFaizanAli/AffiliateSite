import React, { useEffect, useState } from "react";

import Fetchdata, {
  FetchBrandsList,
  FetchCategoryList,
} from "../Component/FetchData";
import { useNavigate } from "react-router-dom";

const ManageBrands = () => {
  useEffect(() => {
    MainFunc();
  }, []);

  const [BrandList, setBrandList] = useState([]);
  const [CategoryList, setCategroyList] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const Navigate = useNavigate();

  async function MainFunc() {
    await getBrandList();
    await getCategory();
  }

  let handleFilterCategory = (v) => {
    let data = [...BrandList].filter((e) => {
      return e.CategoryName === v;
    });
    setfilterData(data);
  };

  const getBrandList = async () => {
    let items = await FetchBrandsList();
    if (items && items.length > 0) {
      setBrandList(items);
      setfilterData(items);
      console.log(items);
    } else {
      alert("No Brand Found Kindly Add Brand");
    }
  };

  async function getCategory() {
    let items = await FetchCategoryList();
    if (items && items.length > 0) {
      setCategroyList(items);
    } else {
      alert("No Category Found Kindly Add Category");
    }
  }

  const handleDeletebrand = async (ID, Name) => {
    const response = await Fetchdata(
      "POST",
      "http://localhost:8080/deletebrand",
      { ID, Name }
    );
    if (response) {
      alert(response.mes);
      getBrandList();
    }
  };

  return (
    <>
      <div className="head d-flex justify-content-between m-2">
        <div>
          <h3>Manage Brand</h3>
        </div>
        <div>
          <button
            className="btn btn-success rounded-0"
            onClick={() => Navigate("/brand/register")}
          >
            Add Brand
          </button>
        </div>
      </div>
      <div className="head d-flex justify-content-center">
        <div className=" m-1">
          <select
            name="FilterCategory"
            className="form-control shadow-sm rounded-0"
            onChange={(e) => handleFilterCategory(e.target.value)}
          >
            <option className="dropdown-item" value="">
              --Choose Category--
            </option>
            {CategoryList &&
              CategoryList.map((key) => {
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
        </div>
        <div className="m-1">
          <button className="btn btn-warning rounded-0" onClick={() => setfilterData(BrandList)}>
            Reset
          </button>
        </div>
      </div>
      <div className="body d-flex justify-content-center gap-3 flex-wrap">
        {filterData &&
          filterData.map((key, index) => {
            const imageUrl = `http://localhost:8080/Images/${key.imgPath.filename}`;
            return (
              <div
                key={index}
                className="card m-2 p-2"
                style={{ maxWidth: "540px" }}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    {/* <img
                        src={key.imgPath}
                        className="img-fluid rounded-start"
                        alt="..."
                      /> */}
                    <img
                      src={imageUrl}
                      alt={key.BrandName}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{key.BrandName}</h5>
                      <div className="card-text">
                        <div className="d-flex gap-2 flex-wrap">
                          <div>
                            <b>Category</b>
                          </div>
                          <div>{key.CategoryName}</div>
                        </div>
                        <div className="d-flex gap-2 flex-wrap">
                          <div>
                            <b>Country</b>
                          </div>
                          <div>{key.BrandCountry}</div>
                        </div>
                      </div>
                      <div className="d-flex button-section flex-wrap gap-2">
                        <div>
                          <button
                            className="btn btn-danger rounded-0"
                            onClick={() => handleDeletebrand(key.ID, key.BrandName)}
                          >
                            Delete
                          </button>
                        </div>
                        <div>
                          <button
                            className="btn btn-light rounded-0"
                            onClick={() =>
                              Navigate("/brand/update", {
                                state: { key, CategoryList },
                              })
                            }
                          >
                            Update
                          </button>
                        </div>
                        <div>
                          <button
                            className="btn btn-primary rounded-0"
                            onClick={() => {
                              Navigate("/coupan/register", {
                                state: { data: key, CategoryList },
                              });
                            }}
                          >
                            Add Coupan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ManageBrands;
