import React, { useEffect, useState } from "react";
import Fetchdata, { FetchCoupanList, DeleteItems } from "../Component/FetchData";
import { useNavigate } from "react-router-dom";

const ManageCoupan = () => {
  
  useEffect(() => {
    MainFunc();
  }, []);

  // useEffect(() => {
  //   getCoupans();
  // }, []);

  const [CounpanList, setCoupanList] = useState([]);
  const Navigate = useNavigate()

  const MainFunc = async () => {
    await getCoupans();
  };

  
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
        window.open(`${response.url}`, '_blank')
        getCoupans(response.url, '_blank')
    }else {
       if(response.mes){
         alert(response.mes)
       }
    }
  };

  const handleDeleteCoupan = async(ID) => {
    await DeleteItems(
      ID,
      "http://localhost:8080/deletecoupan",
    ).then(getCoupans());
  };

  async function getCoupans() {
    let items = await FetchCoupanList();
    if (items && items.length > 0) {
      //   console.log(items);
      setCoupanList(items);
    } else {
      alert("No Coupan Found Kindly Add Coupan");
    }
  }

  return (
    <>
      <div className="main m-2">
        <div className="head d-flex justify-content-between m-2">
        <div>
          <h3>Manage Coupan </h3>
        </div>
        <div>
          <button className="btn btn-danger rounded-0 shadow-sm" onClick={() => Navigate('/brand')}>Add Coupan</button>
        </div>
      </div>
        <div className="body d-flex justify-content-center flex-wrap gap-2"> 
            {CounpanList &&
              CounpanList.map((key, index) => {
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
                        <button
                            className="btn btn-danger rounded-0"
                            onClick={() => handleDeleteCoupan(key.ID)}
                          >
                            Delete
                          </button>
                          <button className="btn btn-primary rounded-0"
                           onClick={() => Navigate('/coupan/update', {state: key})}
                          >
                            Update
                          </button>
                        </div>
                        <div className=" d-flex gap-2">
                        <button
                            className="btn btn-success rounded-0"
                            onClick={() => handleShortURL(key.ShortID)}
                          >
                            Add Click
                          </button>
                          <button
                            className="btn btn-info rounded-0"
                            onClick={() => Navigate('/coupan/analytics', {state: key})}
                          >
                            Analytics
                          </button>
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
