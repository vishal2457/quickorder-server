const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const db = require('./models');
const app = express();

app.use(cors())
.use(helmet())
.use(compression())
.use(express.json({limit: '50mb'}))
.use(express.urlencoded({limit: '50mb', extended: true}))
.use(
  helmet.frameguard({
    action: "deny",
  })
);

/**
 * * Running this script will sync models to db
 * ! .sync({force: true}), WILL SYNC EXISTING MODELS CHANGES BUT WILL DELETE ALL DATA
 */
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("Database Synced with models");
//   })
//   .catch((err) => {
//     console.log(err, "this is error");
//   });



app.use("/static", express.static(path.join(__dirname, "public")));
require('./routes')(app);


module.exports = app
