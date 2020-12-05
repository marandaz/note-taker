const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));``

// utilizes the two routes modules in the routes directory
require("./api")(app);
require("./htmlRoutes")(app);

// starts the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });