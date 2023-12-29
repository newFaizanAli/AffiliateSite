import React, { useEffect, useState } from "react";

import Fetchdata, {
  FetchBrandsList,
  FetchCategoryList,
} from "../Component/FetchData";
import { useNavigate } from "react-router-dom";
import { Buttons } from "../Component/Buttons";

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
          <Buttons
            name={" Add Brand"}
            func={() => Navigate("/brand/register")}
            color={"success"}
          />
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
          <Buttons
            name={"Reset"}
            func={() => setfilterData(BrandList)}
            color={"warning"}
          />
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
                        <Buttons
                          name={"Delete"}
                          func={() => handleDeletebrand(key.ID, key.BrandName)}
                          color={"danger"}
                        />

                        <Buttons
                          name={"Update"}
                          func={() =>
                            Navigate("/brand/update", {
                              state: { key, CategoryList },
                            })
                          }
                          color={"light"}
                        />

                        <Buttons
                          name={"Add Coupan"}
                          func={() => {
                            Navigate("/coupan/register", {
                              state: { data: key, CategoryList },
                            });
                          }}
                          color={"primary"}
                        />
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
