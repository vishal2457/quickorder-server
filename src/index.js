const app = require('./app');
const db = require('./models');

const start = async () => {
/**
 * @Database_Connection
 */
 db.sequelize
 .authenticate()
 .then(() => {
   console.log("Database Authenticated");
 })
 .catch((err) => {
   console.log(err, "this is error");
 });

/**
 * @Server_Initialization
 */
 let port  = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`Listening on port ${port}!`);
    });
  };

  start();