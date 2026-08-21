const express = require("express");

const {
    getRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getTopRestaurants
} = require("../controllers/restaurantController");

const {
    getRestaurantMenu,
    createMenuItem
} = require("../controllers/menuController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/top", getTopRestaurants);

router.get("/", getRestaurants);

router.get("/:id", getRestaurantById);

router.post("/", protect, createRestaurant);

router.put("/:id", protect, updateRestaurant);

router.delete("/:id", protect, deleteRestaurant);

router.get("/:id/menu", getRestaurantMenu);

router.post("/:id/menu", protect, createMenuItem);


module.exports = router;
