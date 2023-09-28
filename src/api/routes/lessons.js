const express = require('express');
const router = express.Router();
const lessonsCtrl = require('../controllers/lessons');

router.get("/:id", lessonsCtrl.getOne);

module.exports = router;