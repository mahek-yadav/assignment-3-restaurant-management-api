const MenuItem = require("../models/MenuItem");
const Restaurant = require("../models/Restaurant");


const getRestaurantMenu = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        const menu = await MenuItem.find({
            restaurantId: req.params.id
        });

        res.status(200).json(menu);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Invalid restaurant ID"
        });
    }
};


const createMenuItem = async (req, res) => {
    try {
        const { name, price, isAvailable } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({
                message: "Name and price are required"
            });
        }

        const restaurant = await Restaurant.findById(
            req.params.id
        );

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        const menuItem = await MenuItem.create({
            restaurantId: req.params.id,
            name,
            price,
            isAvailable:
                isAvailable === undefined
                    ? true
                    : isAvailable
        });

        res.status(201).json({
            message: "Menu item added successfully",
            menuItem
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create menu item"
        });
    }
};


const updateMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            message: "Menu item updated successfully",
            menuItem
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Failed to update menu item"
        });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(
            req.params.id
        );

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            message: "Menu item deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Failed to delete menu item"
        });
    }
};


module.exports = {
    getRestaurantMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
};
