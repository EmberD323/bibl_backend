require("dotenv").config();
const express = require("express");
const cors = require("cors")
const bodyParser = require('body-parser')
const app = express();
app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
 });
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//routes
const userRouter = require("./routes/userRouter");
const bookRouter = require("./routes/bookRouter");


app.use("/", userRouter);
app.use("/lists", bookRouter);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
//errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

  