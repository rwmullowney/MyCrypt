const router = require("express").Router();
const usersController = require("../../controllers/usersController");


router.route("/")
  .get(usersController.findAll)
  .post(usersController.createUser);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(usersController.findById)
//   .put(usersController.update)
//   .delete(usersController.remove);

module.exports = router;
