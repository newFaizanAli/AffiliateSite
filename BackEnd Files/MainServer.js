const express = require("express");
require('dotenv').config();
const cors = require("cors");
const bodyParse = require("body-parser");
const server = express();
const multer = require("multer");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const path = require("path");
let saltRound = 10;
const shortid = require("shortid");

server.use(cors());
// server.use(bodyParse.json());
server.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const imagesPath = path.join(__dirname, "BackEnd Files", "Images");
server.use("/Images", express.static(imagesPath));

const {
  RegisterUser,
  RegisterUserList,
  DeleteUser,
  UpdateUser
} = require("./RegisterUser");


const {
  RegisterCategory,
  RegisterCategoryList,
  DeleteCatgeory,
  UpdateCategory,
  RegisterBrand,
  RegisterBrandsList,
  DeleteBrand,
  UpdateBrand,
} = require("./ManageBrands");

const {
  RegisterCoupan,
  RegisterCoupanList,
  DeleteCoupan,
  ShortCoupanLink,
  UpdateCoupan,
} = require("./ManageCoupan");

let ConnectionFunc = async () => {
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);
  return client;
};

// Category Section
server.post("/addcategory", async (req, resp) => {
  let result = await Promise.resolve(
    RegisterCategory(ConnectionFunc, req.body)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

server.get("/categorylist", async (req, resp) => {
  let result = await Promise.resolve(RegisterCategoryList(ConnectionFunc)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

server.post("/deletecatgeory", async (req, resp) => {
  let result = await Promise.resolve(
    DeleteCatgeory(ConnectionFunc, req.body.ID)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

server.post("/updatecategory", async (req, resp) => {
  let result = await Promise.resolve(
    UpdateCategory(ConnectionFunc, req.body)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

// Brand Section

server.post("/registerbrand", upload.single("imgPath"), async (req, resp) => {
  // server.post("/registerbrand", upload.single('imgPath'), async (req, resp) => {
  const { BrandName, BrandCountry, UserEmail, CategoryName } = req.body;
  const file = req.file;
  const brandData = {
    BrandName,
    BrandCountry,
    UserEmail,
    CategoryName,
    imgPath: file,
  };
  let result = await Promise.resolve(
    RegisterBrand(ConnectionFunc, brandData)
  ).then((res) => {
    return res;
  });

  resp.json(result);
});

server.get("/brandslist", async (req, resp) => {
  let result = await Promise.resolve(RegisterBrandsList(ConnectionFunc)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

server.post("/deletebrand", async (req, resp) => {
  let result = await Promise.resolve(
    DeleteBrand(ConnectionFunc, req.body.ID, req.body.Name)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

server.post("/updatebrand", async (req, resp) => {
  let result = await Promise.resolve(
    UpdateBrand(ConnectionFunc, req.body)
  ).then((res) => {
    return res; 
  });
  resp.json(result);
});

// Coupan Section

server.post("/registercoupan", upload.single("ICON"), async (req, resp) => {
  const {
    BrandName,
    CoupanCode,
    CoupanName,
    Category,
    Event,
    ExpireDate,
    Month,
    SaleAmount,
    StartDate,
    WebURL,
  } = req.body;

  const brandData = {
    BrandName,
    CoupanCode,
    CoupanName,
    Category,
    Event,
    ExpireDate,
    Month,
    SaleAmount,
    StartDate,
    WebURL,
    ICON: req.file,
  };
  
  const shortURL =  shortid()
  let data = {
    ShortID: shortURL,
    Click : 0,
    ClickHitory : [],
    ...brandData
  }
    let result = await Promise.resolve(
    RegisterCoupan(ConnectionFunc, data)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

server.get("/shortURL/:code", async (req, resp) => {
  resp.send(`Short URL is ${req.params.code}`);
  console.log(`Short URL`);
});

server.post("/updatecoupan", async (req, resp) => {
  let result = await Promise.resolve(
    UpdateCoupan(ConnectionFunc, req.body)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

server.post("/shortURL/:shorturl", async (req, resp) => {
  const shortURL = req.params.shorturl;
  let result = await Promise.resolve(
    ShortCoupanLink(ConnectionFunc, shortURL, resp)
  ).then((res) => {
    return res;
  });
  let resp_result = await result;
  if (resp_result) {
    if (resp_result.WebURL) {
      resp.json({ link: true, url: resp_result.WebURL });
    } else {
      resp.json({ link: false, ...resp_result });
    }
  }
});

server.get("/registercoupanlist", async (req, resp) => {
  let result = await Promise.resolve(RegisterCoupanList(ConnectionFunc)).then(
    (res) => {
      return res;
    }
  );
  // console.log(result);
  resp.json(result);
});

server.post("/deletecoupan", async (req, resp) => {
  let result = await Promise.resolve(
    DeleteCoupan(ConnectionFunc, req.body.ID)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

//User Section

let UserLogin = async (email, password) => {
  let client = await ConnectionFunc();
  let res = await client.connect();
  let database = res.db("UserDB").collection("RegisterUser");
  const user = await database.findOne({ Email: email });
  if (!user) {
    return { success: false, mes: "User not found" };
  }
  const passwordMatch = await bcrypt.compare(password, user.Password);
  if (passwordMatch) {
    return { success: true, mes: "Login successful" };
  } else {
    return { success: false, mes: "Incorrect password" };
  }
};

server.get("/registeruserlist", async (req, resp) => {
  let result = await Promise.resolve(RegisterUserList(ConnectionFunc)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

server.post("/deleteuser", async (req, resp) => {
  let result = await Promise.resolve(
    DeleteUser(ConnectionFunc, req.body.ID)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});


server.post("/updateuser", async (req, resp) => {
  let result = await Promise.resolve(
    UpdateUser(ConnectionFunc, req.body)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

server.post("/registeruser", async (req, resp) => {
  let salt = bcrypt.genSaltSync(saltRound);
  let hashPass = bcrypt.hashSync(req.body.Password, salt);
  let Data = { 
    Name: req.body.Name,
    UserName: req.body.Username,
    Contact: req.body.Contact,
    Password: hashPass,
    Email: req.body.Email,
  };
  let result = await Promise.resolve(RegisterUser(ConnectionFunc, Data)).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

server.post("/userlogin", async (req, resp) => {
  let result = await Promise.resolve(
    UserLogin(req.body.Email, req.body.Password)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

server.listen(8080, () => {
  console.log("Started");
});
