const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
  .get(usersController.findAll)
  .post(usersController.createUser)
  // .get(usersController.userLogin);

// Matches with "/api/users/:userLogin"
router
  .route("/:userLogin")
  .get(usersController.userLogin)
  // .put(usersController.update)
  // .delete(usersController.remove);

module.exports = router;
