require("dotenv").config();
const connection = require("./config/database");
const express = require("express");
const fileUpload = require("express-fileupload");
const { MongoClient, Code } = require("mongodb");

const app = express();
const port = process.env.PORT || 3001;
const hostname = process.env.HOST_NAME;

// Config file upload
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// Config res.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config view engine & static file
const configViewEngine = require("./config/viewEngine");
configViewEngine(app);

const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const { name } = require("ejs");
app.use("/", webRoutes);
app.use("/v1/api", apiRoutes);

(async () => {
  try {
    // Using mongoose
    await connection();

    // Using mongodb driver
    // const client = new MongoClient(process.env.DB_HOST_WITH_DRIVER);
    // await client.connect();
    // const db = client.db(process.env.DB_NAME);
    // const collection = db.collection("customers");
    // await collection.insertOne({
    //   name: "John",
    //   address: {
    //     coutry: {
    //       name: "Viet Nam",
    //       code: "VN",
    //     },
    //     province: "Da Nang",
    //   },
    // });
    // console.log(">>> find: ", await collection.findOne({address: "Da Nang"}));

    app.listen(port, hostname, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>>ERROR CONNECT TO DATABASE: ", error.message);
  }
})();
