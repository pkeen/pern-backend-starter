const express = require("express");
const router = express.Router();
const modulesCtrl = require("../controllers/modules");

router.get("/:id", modulesCtrl.getOne);

module.exports = router;
