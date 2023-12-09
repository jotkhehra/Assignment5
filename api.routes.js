const express = require("express");
apiRoutes = express.Router();
const apiUsersRoutes = require("./api/api.users.routes");
const apiProductsRoutes = require("./api/api.products.routes");
const apiOrdersRoutes = require("./api/api.orders.routes");





// User Routes
apiRoutes.use("/users", apiUsersRoutes);
apiRoutes.use("/products", apiProductsRoutes);
apiRoutes.use("/orders", apiOrdersRoutes);

module.exports = apiRoutes;
