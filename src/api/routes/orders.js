const express = require("express");
const router = express.Router();
const ordersCtrl = require("../controllers/orders");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

// these routes begin with /api/users

// POST /api/orders
router.post("/", /*ensureLoggedIn,*/ ordersCtrl.create);

module.exports = router;
