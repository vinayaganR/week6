 1. Set up your development environment
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// 2. Define the schema for your food and nutrition data
const foodSchema = new mongoose.Schema({
    foodItemName: String,
    foodGroup: String,
    description: String,
    nutritionalInformation: {
        calories: Number,
        macronutrients: {
            proteins: Number,
            fats: Number,
            carbohydrates: Number,
        },
        // Add more nutritional information as needed
    },
    servingSize: String,
    allergens: [String],
    ingredients: [String],
    preparationMethods: String,
    certifications: [String],
    countryOfOrigin: String,
    brandOrManufacturer: String,
    dietaryRestrictions: [String],
    healthBenefits: String,
    bestPractices: String
});

const Food = mongoose.model('Food', foodSchema);

// 3. Implement CRUD operations using Express.js
app.use(bodyParser.json());

// Create a new food item
app.post('/api/foods', async (req, res) => {
    try {
        const newFood = await Food.create(req.body);
        res.status(201).json(newFood);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Retrieve all food items
app.get('/api/foods', async (req, res) => {
    try {
        const allFoods = await Food.find();
        res.json(allFoods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve a specific food item by ID
app.get('/api/foods/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (food) {
            res.json(food);
        } else {
            res.status(404).json({ message: 'Food not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a food item
app.put('/api/foods/:id', async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedFood);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a food item
app.delete('/api/foods/:id', async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.json({ message: 'Food deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Set up MongoDB database
mongoose.connect('mongodb://localhost:27017/foodDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // 5. Test your API endpoints using Postman
        app.listen(PORT, () => console.log(Server running on port ${PORT}));
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));
