import React, { useState, useEffect } from "react";
import { FetchUserList, DeleteItems } from "../Component/FetchData";
import { Buttons } from "../Component/Buttons";
import { useNavigate } from "react-router-dom";
import { BoxModel, handelCloseModelBox, handelOpenModelBox } from "../Component/BoxModel";

const ManageUsers = () => {
  useEffect(() => {
    MainFunc();
  }, []);

  const [UserList, setUserList] = useState([]);
  const [Mes, setMes] = useState('')
  const Navigate = useNavigate()
  
  const MainFunc = async () => {
    await getUser();
  };
  
  const handleModelBox = (resp) => {
    setMes(resp)
    handelOpenModelBox('dialog')
  }

  const handleDeleteUser = async (ID) => {
    await DeleteItems(
        ID,
        "http://localhost:8080/deleteuser",
      ).then(getUser());
  };

  const getUser = async () => {
    let users = await FetchUserList();
    if (users && users.length > 0) {
      setUserList(users);
    } else {
      handleModelBox("No User Found")
    }
  };

  return (
    <>
      <div className="main m-2">
        <div className="head d-flex justify-content-between m-2">
          <div>
            <h3>Manage User </h3>
          </div>
        </div>
        <dialog className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm" id="dialog">
           <BoxModel mes={Mes} closeFunc={() => handelCloseModelBox("dialog")} />
         </dialog>
        <div className="body">
        <table className="table shadow-sm table-bordered">
              <thead className="table-light text-center " key={"thead"}>
                <tr className="mb-2">
                  <th scope="col">
                    <h6 className="h6">Name</h6>
                  </th>
                  <th>
                    <h6 className="h6">Username</h6>
                  </th>
                  <th>
                    <h6 className="h6">Contact</h6>
                  </th>
                  <th>
                    <h6 className="h6">Email</h6>
                  </th>
                  <th>
                    <h6 className="h6">Option</h6>
                  </th>
                </tr>
              </thead>

              <tbody className="border-light text-center" key={"tbody"}>
                {UserList &&
                  UserList.map((key, index) => {
                    return (
                      <tr key={index}>
                        <td>{key.Name}</td>
                        <td>{key.UserName}</td>
                        <td>{key.Contact}</td>
                        <td>{key.Email}</td>
                        <td>
                          <div className="m-1 p-0 d-flex flex-wrap gap-2 justify-content-center">
                            <Buttons name={'Delete'} color={'outline-danger'} func={() => handleDeleteUser(key.ID)} />
                            <Buttons name={'Update'} color={'outline-primary'} func={() => Navigate('/updateuser', {state : key})} />
                            
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
