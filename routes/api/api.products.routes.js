const express = require("express");
apiProductsRoutes = express.Router();

const ProductsService = require("../../services/products.service.js");



//  Products
apiProductsRoutes.get('/', async (req, res) => {
  const products = await ProductsService.find();
  res.json(products);
});

// GET a single product
apiProductsRoutes.get('/:id', async (req, res) => {
  const products = await ProductsService.findById(req.params.id);
  res.json(products);
});

// DELETE a product
apiProductsRoutes.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const isDeleted = await ProductsService.delete(id);
    if (isDeleted) {
      return res.json({ message: `Product ${id} was deleted successfully` });
    } else {
      return res.json({ message: `Product ${id} not found` });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
});

// POST a new product
apiProductsRoutes.post('/', async (req, res) => {
  const newProduct = await ProductsService.create(req.body);
  res.json(newProduct);
});


module.exports = apiProductsRoutes;
