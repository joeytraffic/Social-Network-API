const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

// Route: /api/users
router.route("/").get(getUsers).post(createUser);

// Route: /api/users/:userId
router
  .route("/:userId")
  .all(getUsers)
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
