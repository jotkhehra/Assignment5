const express = require("express");
const pageRoutes = express.Router();
const UsersService = require("../services/users.service");
const ProductsService = require("../services/products.service");
const AuthenticationService = require("../services/authentication.service");

pageRoutes.get("/", (req, res) => {
  res.render("login");
});

pageRoutes.post("/", (req, res) => {
  const authentication = AuthenticationService.authenticate(req.body.name, req.body.pass);
  if (authentication) {
    res.redirect(`/list`);
  }
  else {
    res.redirect("/");
  }
});

pageRoutes.get("/list", async (req, res) => {
  const users = await UsersService.find();

  const itemsToDisplay = 15;
  const page = parseInt(req.query?.page) || 1;
  const start = page == 1 ? 0 : (page - 1) * itemsToDisplay - 1;
  const end = start + itemsToDisplay;
  const filteredUsers = users.filter((user, idx) => idx > start && idx <= end);

  res.render("list", {
    title: "list",
    users: filteredUsers,
    itemsToDisplay,
    page,
    start,
    end,
  });
});



pageRoutes.get("/detail/:id", async (req, res) => {
  const user = await UsersService.findById(req.params.id);
  res.render("detail", { user });
});



pageRoutes.get("/listProducts", async (req, res) => {
  const products = await ProductsService.find();

  const itemsToDisplay = 15;
  const page = parseInt(req.query?.page) || 1;
  const start = page == 1 ? 0 : (page - 1) * itemsToDisplay - 1;
  const end = start + itemsToDisplay;
  const filteredProducts = products.filter((product, idx) => idx > start && idx <= end);

  res.render("listProducts", {
    title: "list - Products",
    products: filteredProducts,
    itemsToDisplay,
    page,
    start,
    end,
  });
});


pageRoutes.get("/detailProduct/:id", async (req, res) => {
  const product = await ProductsService.findById(req.params.id);
  res.render("detailProduct", { product });
});






module.exports = pageRoutes;
