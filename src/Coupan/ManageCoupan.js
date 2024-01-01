import React, { useEffect, useState } from "react";
import Fetchdata, {
  FetchCoupanList,
  DeleteItems,
} from "../Component/FetchData";
import { useNavigate } from "react-router-dom";
import { Buttons } from "../Component/Buttons";
import { handelOpenModelBox, BoxModel, handelCloseModelBox } from "../Component/BoxModel";

const ManageCoupan = () => {
  useEffect(() => {
    MainFunc();
  }, []);

  const Navigate = useNavigate();
  const [CounpanList, setCoupanList] = useState([]);
  const [filterCoupanList, setfilterCoupanList] = useState([]);
  const [BrandList, setBrandList] = useState([]);
  const [CategoryList, setCategroyList] = useState("");
  const [Mes, setMes] = useState('')

  const MainFunc = async () => {
    await getCoupans();
  };

  const handleModelBox = (resp) => {
   setMes(resp)
   handelOpenModelBox('dialog')
  }

  const handleShortURL = async (shortURL) => {
    // console.log(shortURL)
    const response = await Fetchdata(
      "POST",
      `http://localhost:8080/shortURL/${shortURL}`,
      { shortURL }
    );
    if (response && response.link === true) {
      console.log(response);
      // Navigate(response.url, { target: '_blank' });
      window.open(`${response.url}`, "_blank");
      getCoupans(response.url, "_blank");
    } else {
      if (response.mes) {
        alert(response.mes)
      }
    }
  };

  const handleDeleteCoupan = async (ID) => {
    await DeleteItems(ID, "http://localhost:8080/deletecoupan").then(
      getCoupans()
    );
  };

  const handleFilterData = (type, value) => {
    let filterItems;
    switch (type) {
      case "category":
        filterItems = filterCoupanList.filter((key) => key.Category === value);
        break;
      case "month":
        filterItems = filterCoupanList.filter((key) => key.Month === value);
        break;
      case "Brand":
        filterItems = filterCoupanList.filter((key) => key.BrandName === value);
        break;
      default:
        filterItems = [...filterCoupanList];
        break;
    }
    setfilterCoupanList(filterItems)
  };

  async function getCoupans() {
    let items = await FetchCoupanList();
    if (items && items.length > 0) {
      console.log(items);
      setCoupanList(items);
      setfilterCoupanList(items);
      setBrandList([...new Set(items.map((item) => item.BrandName))]);
      setCategroyList([...new Set(items.map((item) => item.Category))]);
    } else {
      handleModelBox("No Coupan Found Kindly Add Coupan")
    }
  }

  return (
    <>
      <div className="main m-2">
        <div className="head d-flex justify-content-between m-2">
          <div>
            <h3>Manage Coupan </h3>
          </div>
          <Buttons
            name={"Add Coupan"}
            color={"danger"}
            func={() => Navigate("/brand")}
          />
        </div>
        <dialog className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm" id="dialog">
           <BoxModel mes={Mes} closeFunc={() => handelCloseModelBox("dialog")} />
         </dialog>
        {/* Filter Section */}
        <div className="d-flex justify-content-center gap-3 mb-2 flex-wrap">
          <div>
            <input className="form-control shadow-sm rounded-0" type="month" onChange={(e) => handleFilterData('month', e.target.value)} />
          </div>
          <div>
            <select
              name="BrandSelect"
              className="form-control shadow-sm rounded-0"
              onChange={(e) => handleFilterData('Brand', e.target.value)}
            >
              <option className="dropdown-item" value="">
                --Select Brand--
              </option>
              {BrandList &&
                BrandList.map((key, index) => {
                  return (
                    <option className="dropdown-item" value={key} key={index}>
                      {key}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <select
              name="BrandSelect"
              className="form-control shadow-sm rounded-0"
              onChange={(e) => handleFilterData('category', e.target.value)}
            >
              <option className="dropdown-item" value="">
                --Select Category--
              </option>
              {CategoryList &&
                CategoryList.map((key, index) => {
                  return (
                    <option className="dropdown-item" value={key} key={index}>
                      {key}
                    </option>
                  );
                })}
            </select>
          </div>
          <Buttons
            name={"Search"}
            color={"warning"}
            func={() => handleFilterData()}
          />
          <Buttons
            name={"Clear All"}
            color={"primary"}
            func={() => setfilterCoupanList(CounpanList)}
          /> 
        </div>
        {/* Body-Section */}
        <div className="body d-flex justify-content-center flex-wrap gap-2">
          {filterCoupanList &&
            filterCoupanList.map((key, index) => {
              return (
                <div key={index}>
                  <div
                    className="card text-center p-2 shadow-sm w-auto h-auto"
                    style={{ width: "18rem" }}
                  >
                    <div className="card-body">
                      <h3 className="card-title">{key.CoupanName}</h3>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        {key.BrandName}
                      </h6>
                      <h2>{key.SaleAmount} %</h2>
                      <h6>End Date : {key.ExpireDate}</h6>
                      <h5>Total : {key.Click}</h5>
                    </div>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      <div className=" d-flex gap-2">
                        <Buttons color={'danger'} name={'Delete'} func={() => handleDeleteCoupan(key.ID) } />
                        <Buttons color={'primary'} name={'Update'} func={() =>
                            Navigate("/coupan/update", { state: key })} />
                      </div>
                      <div className=" d-flex gap-2">
                        <Buttons color={'success'} name={'Add Click'} func={() => handleShortURL(key.ShortID)} />
                        
                        <Buttons color={'info'} name={'Analytics'} func={() =>
                            Navigate("/coupan/analytics", { state: key })} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ManageCoupan;
