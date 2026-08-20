const express = require("express");

const {
    updateMenuItem,
    deleteMenuItem
} = require("../controllers/menuController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/:id", protect, updateMenuItem);

router.delete("/:id", protect, deleteMenuItem);


module.exports = router;