const { InsertQuery, GetValues, DeleteQuery, UpdateQuery } = require("./CrudOperation");
const { GetLastID } = require("./ManageCoupan");

const RegisterUser = async (Connection, Data) => {
  const filter = { Email: Data.Email };
  const getuserID = await GetLastID(Connection, "UserDB", "RegisterUser");
  let ID = 1;
  if (getuserID.length > 0) {
    ID = getuserID[0].ID + 1;
  }
  const result = await InsertQuery(
    Connection,
    "UserDB", 
    "RegisterUser",
    filter,
    { ...Data, ID }
  );
  return result;
};
 
const RegisterUserList = async (Connection) => {
  const fields = {
    _id: 0,
    Password: 0,
  };
  const result = await GetValues(Connection, "UserDB", "RegisterUser", fields);
  return result;
};

const DeleteUser = async (ConnectionFunc, ID) => {
  const filter = { ID };
  const result = await DeleteQuery(
    ConnectionFunc,
    "UserDB",
    "RegisterUser",
    filter
  );
  return result;
};

const UpdateUser = async (Connection, obj) => {
  let filter = { ID: obj.ID };
  const result = await UpdateQuery(
    Connection,
    "UserDB",
    "RegisterUser",
    filter,
    obj
  );
  return result;
};

module.exports = { RegisterUser, RegisterUserList, DeleteUser, UpdateUser };
