const Restaurant = require("../models/Restaurant");

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();

        res.status(200).json(restaurants);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch restaurants"
        });
    }
};


const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        res.status(200).json(restaurant);

    } catch (error) {
        res.status(400).json({
            message: "Invalid restaurant ID"
        });
    }
};

const createRestaurant = async (req, res) => {
    try {
        const {
            name,
            city,
            address,
            cuisine,
            rating
        } = req.body;

        if (
            !name ||
            !city ||
            !address ||
            !cuisine ||
            rating === undefined
        ) {
            return res.status(400).json({
                message: "Name, city, address, cuisine and rating are required"
            });
        }

        const restaurant = await Restaurant.create({
            name,
            city,
            address,
            cuisine,
            rating
        });

        res.status(201).json({
            message: "Restaurant created successfully",
            restaurant
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create restaurant"
        });
    }
};


const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        res.status(200).json({
            message: "Restaurant updated successfully",
            restaurant
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Failed to update restaurant"
        });
    }
};


const deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(
            req.params.id
        );

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        res.status(200).json({
            message: "Restaurant deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Failed to delete restaurant"
        });
    }
};


const getTopRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find()
            .sort({ rating: -1 })
            .limit(5);

        res.status(200).json({
            message: "Top 5 restaurants",
            restaurants
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch top restaurants"
        });
    }
};


module.exports = {
    getRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getTopRestaurants
};
