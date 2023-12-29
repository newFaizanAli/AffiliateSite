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
  
const RegisterCoupan = async (Connection, Data) => {
  const filter = { ID: Data.ID };
  const getcategID = await GetLastID(
    Connection,
    "CoupanDB",
    "RegisterCoupan"
  );
  let ID = 1;
  if (getcategID.length > 0) {
    ID = getcategID[0].ID + 1;
  }
  const result = await InsertQuery(
    Connection,
    "CoupanDB",
    "RegisterCoupan",
    filter,
    {...Data, ID}
  );
  return result;
};


const RegisterCoupanList = async (Connection) => {
    const fields = {
      _id: 0,
    };
    const result = await GetValues(Connection, "CoupanDB", "RegisterCoupan", fields);
    return result;
  };

  const UpdateCoupan = async (Connection, obj) => {
    let filter = { ID: obj.ID };
    const result = await UpdateQuery(
      Connection,
      "CoupanDB", "RegisterCoupan",
      filter,
      obj
    );
    return result;
  };

  const DeleteCoupan = async (ConnectionFunc, ID) => {
    const filter = { ID };
    const result = await DeleteQuery(
      ConnectionFunc,
      "CoupanDB", "RegisterCoupan",
      filter
    );
    return result;
  };
  

  const ShortCoupanLink = async (connection, shortURL, res) => {
    let client = await connection();
    let db = await client.db('CoupanDB');
    let collection = db.collection('RegisterCoupan');
    const existingDocument = await collection.findOne({ ShortID: shortURL });
    if (existingDocument) {
        const currentTime = new Date();
        const expireDate = new Date(existingDocument.ExpireDate);
        if (currentTime < expireDate) {
            const updatedTotalClicks = (existingDocument.Click ? existingDocument.Click : 0) + 1;
            const updatedClickHistory = [
                ...(existingDocument.ClickHitory || []),
                { ClickTime: currentTime }
            ];
            await collection.updateOne(
                { ShortID: shortURL },
                {
                    $set: {
                        Click: updatedTotalClicks,
                        ClickHitory: updatedClickHistory
                    }
                }
            );
            return {
                ...existingDocument,
                Click: updatedTotalClicks,
                ClickHitory: updatedClickHistory
            };
        } else {
            return {mes: 'Link has expired'};
        }
    } else {
        return {mes: 'Link not found'};
    }
};


module.exports = { GetLastID, RegisterCoupan, RegisterCoupanList, UpdateCoupan, DeleteCoupan, ShortCoupanLink };
