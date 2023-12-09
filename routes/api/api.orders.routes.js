const express = require("express");

const OrdersService =require("../../services/orders.service.js");

apiOrdersRoutes = express.Router();


// Orders routes


// GET all orders
apiOrdersRoutes.get('/', async (req, res) => {
  const orders = await OrdersService.findAll();
  res.json(orders);
});

// GET a single order
apiOrdersRoutes.get('/:id', async (req, res) => {
  const order = await OrdersService.findById(req.params.id);
  res.json(order);
});

// DELETE an order
apiOrdersRoutes.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const isDeleted = await OrdersService.delete(id);
    if (isDeleted) {
      return res.json({ message: `Order ${id} was deleted successfully` });
    } else {
      return res.json({ message: `Order ${id} not found` });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
});

apiOrdersRoutes.post('/', async (req, res) => {
  const newOrder = await OrdersService.create(req.body);
  res.json(newOrder);
});








module.exports = apiOrdersRoutes;
