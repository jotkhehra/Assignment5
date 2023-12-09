const express = require("express");
const UsersService = require("../../services/users.service");

apiUsersRoutes = express.Router();

// User Routes
apiUsersRoutes.get("/", async (req, res) => {
  const users = await UsersService.find()
  res.json(users);
});

apiUsersRoutes.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await UsersService.findById(id);
  res.json(user);
});

apiUsersRoutes.post("/", async  (req,res) =>{
  const user =  await UsersService.create(req.body);
  res.json({user});

});

apiUsersRoutes.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const isDeleted = await UsersService.delete(id);
    if (isDeleted) {
      return res.json({ message: `User ${id} was deleted successfully` });
    } else {
      return res.json({ message: `User ${id} not found` });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
});



module.exports = apiUsersRoutes;
