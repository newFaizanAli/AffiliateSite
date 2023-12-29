import React, { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { UserRoleContext } from "./ContextFile";

const NavbarComp = () => {
 
  const {  logout } = useContext(UserRoleContext);

  const hanldeLogout = () => {
     logout()
     Navigate('/login')
    }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <div className="h3">@ffliate</div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link acive"
                  aria-current="page"
                  to={"/home"}
                >
                  Home
                </Link>
               
              </li>
              <li>
              <Link
                  className="nav-link acive"
                  aria-current="page"
                  to={"/addcategory"}
                >
                  Category
                </Link>
              </li>
              <li>
              <Link
                  className="nav-link acive"
                  aria-current="page"
                  to={"/brand"}
                >
                  Brand
                </Link>
              </li>
              <li>
              <Link
                  className="nav-link acive"
                  aria-current="page"
                  to={"/coupan/manage"}
                >
                  Coupan
                </Link>
              </li>
              <li>
              <Link
                  className="nav-link acive"
                  aria-current="page"
                  to={"/users"}
                >
                  Users
                </Link>
              </li>
            </ul>
            <div className="logout ms-2">
              <Link
                className="btn btn-outline-primary  rounded-0 shadow-sm"
                to={"/registeruser"}
              >
                SignUp
              </Link>
            </div>
            <div className="logout ms-2">
              <Link
                className="btn btn-outline-danger  rounded-0 shadow-sm"
                to={"/login"}
              >
                SignOut
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarComp;
