import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();
const port = 5000;
const mongoURL = "mongodb+srv://root:root@cluster0.q6rbb.mongodb.net/restaurantdata?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Database connection error:", error));

const db = mongoose.connection;
db.once("open", () => console.log("MongoDB connection established"));
const Restaurant = db.collection("restaurantdata");

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get("/restaurant/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid restaurant ID" });
        
        const restaurantData = await Restaurant.findOne({ "restaurant.R.res_id": id });
        if (!restaurantData) return res.status(404).json({ error: "Restaurant not found" });
        
        res.json(restaurantData);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.get("/restaurantdata", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * 10;
        
        const restaurantData = await Restaurant.find().skip(skip).limit(10).toArray();
        res.json(restaurantData);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.get("/locrestaurantdata", async (req, res) => {
    try {
        const { page = 1, latitude, longitude } = req.query;
        if (!latitude || !longitude) return res.status(400).json({ error: "Latitude and longitude required" });
        
        const skip = (parseInt(page) - 1) * 10;
        const radiusKm = 10.0;
        const latOffset = radiusKm / 111;
        const lonOffset = radiusKm / (111 * Math.cos(latitude * Math.PI / 180));

        const query = {
            "restaurant.location.latitude": { $gte: latitude - latOffset, $lte: latitude + latOffset },
            "restaurant.location.longitude": { $gte: longitude - lonOffset, $lte: longitude + lonOffset }
        };
        
        const restaurantData = await Restaurant.find(query).skip(skip).limit(10).toArray();
        res.json(restaurantData);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.get("/getbykeywords", async (req, res) => {
    try {
        const { key, page = 1 } = req.query;
        if (!key) return res.status(400).json({ error: "No keywords provided" });
        
        const skip = (parseInt(page) - 1) * 10;
        const keywords = Array.isArray(key) ? key : [key];

        const query = { $or: keywords.map(k => ({ "restaurant.cuisines": { $regex: k, $options: "i" } })) };
        const restaurantData = await Restaurant.find(query).skip(skip).limit(10).toArray();
        
        res.json(restaurantData);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.get("/getDatabykeywords", async (req, res) => {
    try {
        const { desc, page = 1 } = req.query;
        if (!desc) return res.status(400).json({ error: "Description required" });
        
        const skip = (parseInt(page) - 1) * 10;
        const stopWords = new Set(["the", "is", "and", "to", "in", "of", "with", "a", "for", "on", "this", "that"]);
        const keywords = desc.toLowerCase().replace(/[^\w\s]/g, "").split(" ").filter(word => !stopWords.has(word) && word.length > 2);
        
        const query = { $or: keywords.map(key => ({
            $or: [
                { "restaurant.cuisines": { $regex: key, $options: "i" } },
                { "restaurant.name": { $regex: key, $options: "i" } }
            ]
        })) };
        
        const restaurantData = await Restaurant.find(query).skip(skip).limit(10).toArray();
        res.json(restaurantData);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});