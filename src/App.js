import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import RootLayout from "./RootLayout";
import HomePage from "./HomePage";
import RegisterUser from "./Users/RegisterUser";
import UserLogin from "./UserLogin";
import RegisterCategory from "./Category/RegisterCategory";
import RegisterBrands from "./Brands/RegisterBrands";
import ManageBrands from "./Brands/ManageBrands";
import UpdateBrand from "./Brands/UpdateBrand";
import AddCoupan from "./Coupan/AddCoupan";
import ManageCoupan from "./Coupan/ManageCoupan";
import UpdateCoupan from "./Coupan/UpdateCoupan";
import ManageUsers from "./Users/ManageUsers";
import UpdateUser from "./Users/UpdateUser";
import CoupanAnalytics from "./Coupan/CoupanAnalytics";
import { useContext } from "react";
import { UserRoleContext } from "./Component/ContextFile";

function App() {
  // const {  isLoggedIn } = useContext(UserRoleContext);

  const isLoggedIn = true
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        {isLoggedIn ? (
          <>
            <Route path="/" element={<RootLayout />}>
              <Route path="home" element={<HomePage />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="registeruser" element={<RegisterUser />} />
              <Route path="updateuser" element={<UpdateUser />} />   
              <Route path="addcategory" element={<RegisterCategory />} />
              <Route path="brand" element={<ManageBrands />} />
              <Route path="brand/register" element={<RegisterBrands />} />
              <Route path="brand/update" element={<UpdateBrand />} />
              <Route path="coupan/manage" element={<ManageCoupan />} />
              <Route path="coupan/register" element={<AddCoupan />} />
              <Route path="coupan/update" element={<UpdateCoupan />} />
              <Route path="coupan/analytics" element={<CoupanAnalytics />} />
            </Route>
          </>
        ) : (
          <Route
            path="/*"
            element={<Navigate to="/login" replace />}
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
