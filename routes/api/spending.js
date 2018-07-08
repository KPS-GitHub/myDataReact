const router = require("express").Router();
const spendingController = require("../../controllers/spendingController");

// Matches with "/api/spending"
router
  .route("/")
  .get(spendingController.findAll)
  .post(spendingController.create);

// Matches with "/api/spending/:id"
router
  .route("/:id")
  .get(spendingController.findById)
  .put(spendingController.update)
  .delete(spendingController.remove);

module.exports = router;
