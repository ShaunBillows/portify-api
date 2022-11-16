require("./db/connection");

const express = require("express");
const userRouter = require("./user/routes");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5001;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
app.use(userRouter);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
