const router = require("express").Router();
const spendingRoutes = require("./spending");
const userRoutes = require("./user");

// Spending routes
router.use("/spending", spendingRoutes);
router.use("/user", userRoutes);

module.exports = router;