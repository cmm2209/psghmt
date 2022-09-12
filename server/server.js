const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/browse"));
app.use(require("./routes/tfilters"));
app.use(require("./routes/authors"));
app.use(require("./routes/autfilters"));
app.use(require("./routes/incipits"));
app.use(require("./routes/incfilters"));
app.use(require("./routes/contributors"));
app.use(require("./routes/contfilters"));
// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
