const InsertQuery = async (Connection, DB, Collection, filter, obj) => {
    let client = await Connection();
    let res = await client.connect();
    let database = await res.db(DB).collection(Collection);
    const existingUser = await database.findOne(filter);
    if (existingUser) {
      return { mes: "Already registered" };
    } else {
      await database.insertOne(obj);
      return { mes: "Successfully Register" };
    }
  };


  const GetValues = async (Connection, DB, Collection, Field) => {
    let client = await Connection();
    let res = await client.connect();
    let database = await res.db(DB).collection(Collection);
    const fields = [
      {
        $project: {
          _id: 0,
          ...Field,
        },
      },
    ];
    const result = await database.aggregate(fields).toArray();
    return result;
  };


  const LastUser = async (Connection, DB, Collection, fields) => {
    let client = await Connection();
    let res = await client.connect();
    let database = await res.db(DB).collection(Collection);
    const result = await database
      .aggregate(fields)
      .sort({ ID: -1 })
      .limit(1)
      .toArray();
    return result;
  };
  
  const DeleteQuery = async (Connection, DB, Collection, filter) => {
    let client = await Connection();
    let res = await client.connect();
    let database = await res.db(DB).collection(Collection);
    const result = await database.deleteOne(filter);
    if (result.deletedCount > 0) {
      return { mes: `Successfully deleted` };
    } else { 
      return { mes: `Entity not found` };
    }
  };

  const UpdateQuery = async (Connection, DB, Collection, filter, Obj) => {
    let client = await Connection();
    let res = await client.connect();
    let database = await res.db(DB).collection(Collection);
    let update = { $set: Obj };
    const result = await database.updateOne(filter, update);
    if (result.modifiedCount > 0) {
      return { mes: `Updated successfully.` };
    } else {
      return { mes: `Entity Not found` };
    }
  };

  
  module.exports = { InsertQuery, GetValues, LastUser, DeleteQuery, UpdateQuery };
  