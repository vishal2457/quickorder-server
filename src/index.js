const app = require('./app');
const db = require('./models');
const httpServer = require("http").createServer(app);
var io = require("socket.io")(httpServer);



const start = async () => {
  let sockets = new Map();

// middleware to autenticate client with jwt
io.use((socket, next) => {
  let token = socket.handshake.query.auth;

if (token) {
    console.log(socket.id, token, "<----authenticated socket added");
    sockets.set(token, socket.id);
    return next();
  }
  return next(new Error("authentication error"));
});

const authenticated = (socket) => {
  //sending client the authentication status
  socket.emit("authenticated", true);
};

//socket connection after authentication
io.on("connection", (socket) => {
  //  console.log(socket.id, "New client connected");
  authenticated(socket);
  socket.on("authenticate", (token) => {
    // console.log(token, "this is token");
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

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

 app.use(function (request, response, next) {
  // console.log(request.body, "this is body");
  request.io = io;
  request.sockets = sockets
  //  request.redis = redisClient;
  next();
});

 require('./routes')(app);

/**
 * @Server_Initialization
 */
 let port  = process.env.PORT || 5000
    httpServer.listen(port, () => {
      console.log(`Listening on port ${port}!`);
    });
  };

  start();