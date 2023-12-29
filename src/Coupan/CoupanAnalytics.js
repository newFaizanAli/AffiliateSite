import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CoupanAnalytics = () => {

  const Location = useLocation();
  const Data = Location.state ? Location.state : null;

  return (
    <>
      {Data ? (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center text-center">
          <div className="card p-2 shadow-lg" style={{ width: "50rem" }}>
            <div>
              <h3 className="h3">{Data.BrandName}</h3>
            </div>
            <div>
              <h6 className="h6">{Data.Category}</h6>
            </div>
            <div>
              <h3 className="h3">Total Clicks : {Data.Click}</h3>
            </div>
            <div className="border-1">
              <h4 className="h4"> Apply Coupan : {Data.CoupanCode}</h4>
            </div>
            <div className="">
              <div>
                <h6 className="h6">Start Date : {Data.StartDate}</h6>
              </div>
              <div>
                <h6 className="h6">End Data : {Data.ExpireDate}</h6>
              </div>
            </div>
            <div>
              <h5 className="h5">Sale Ammount :{Data.SaleAmount}</h5>
            </div>
            <b>Click Time History</b>
            <div className="card text-center shadow-sm" style={{height:'50px', overflow:'scroll'}}>   
              {Data.ClickHitory.map((key, index) => {
                return <div key={index}>{key.ClickTime}</div>;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>Kinldy Check Analytics from Manage Coupan</div>
      )}
    </>
  );
};

export default CoupanAnalytics;
