const {
  InsertQuery,
  GetValues,
  LastUser,
  DeleteQuery,
  UpdateQuery,
} = require("./CrudOperation");

const GetLastID = async (Connection, DB, Collection) => {
  const fields = [
    {
      $project: {
        _id: 0,
        ID: 1,
      },
    },
  ];
  const result = await LastUser(Connection, DB, Collection, fields);
  return result;
};

const RegisterCategory = async (Connection, Data) => {
  const filter = { CategoryName: Data.CategoryName };
  const getcategID = await GetLastID(Connection, "Brands", "Category");
  let ID = 1;
  if (getcategID.length > 0) {
    ID = getcategID[0].ID + 1;
  }
  const result = await InsertQuery(Connection, "Brands", "Category", filter, {
    ...Data,
    ID,
  });
  return result;
};

const RegisterCategoryList = async (Connection) => {
  const fields = {
    _id: 0,
  };
  const result = await GetValues(Connection, "Brands", "Category", fields);
  return result;
};

const DeleteCatgeory = async (ConnectionFunc, ID) => {
  const filter = { ID };
  const result = await DeleteQuery(
    ConnectionFunc,
    "Brands",
    "Category",
    filter
  );
  return result;
};

const UpdateCategory = async (Connection, obj) => {
  let filter = { ID: obj.ID };
  const result = await UpdateQuery(
    Connection,
    "Brands",
    "Category",
    filter,
    obj
  );
  return result;
};

const RegisterBrand = async (connection, Data) => {
  const filter = { BrandName: Data.BrandName };
  const getcategID = await GetLastID(connection, "Brands", "RegisterBrand");
  let ID = 1;
  if (getcategID.length > 0) {
    ID = getcategID[0].ID + 1;
  }
  const result = await InsertQuery(
    connection,
    "Brands",
    "RegisterBrand",
    filter,
    {
      ...Data,
      ID,
    }
  );
  return result;
};

const RegisterBrandsList = async (Connection) => {
  const fields = {
    _id: 0,
  };
  const result = await GetValues(Connection, "Brands", "RegisterBrand", fields);
  return result;
};

const DeleteBrandByID = async (ConnectionFunc, ID) => {
  const filter = { ID };
  const result = await DeleteQuery(
    ConnectionFunc,
    "Brands",
    "RegisterBrand",
    filter
  );
  return result;
};

const DeleteBrand = async (ConnectionFunc, ID, Name) => {
  const filter = { BrandName: Name };
  const DeleteValue = await DeleteQuery(
    ConnectionFunc,
    "CoupanDB",
    "RegisterCoupan",
    filter
  );
  if (DeleteValue) {
    const result = DeleteBrandByID(ConnectionFunc, ID);
    return result;
  } else {
    const result = DeleteBrandByID(ConnectionFunc, ID);
    return result;
  }
};

const UpdateBrand = async (Connection, obj) => {
  let filter = { ID: obj.ID };
  const result = await UpdateQuery(
    Connection,
    "Brands",
    "RegisterBrand",
    filter,
    obj
  );
  return result;
};

module.exports = {
  RegisterCategory,
  RegisterCategoryList,
  DeleteCatgeory,
  UpdateCategory,
  RegisterBrand,
  RegisterBrandsList,
  DeleteBrand,
  UpdateBrand,
};
