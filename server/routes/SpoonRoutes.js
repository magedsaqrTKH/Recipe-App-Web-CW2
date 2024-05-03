const express = require('express');
const axios = require('axios');

const router = express.Router();

const SPOONACULAR_RANDOM_RECIPE_URL = 'https://api.spoonacular.com/recipes/random';
const SPOONACULAR_API_KEY = 'e82209d22cec4bcbaea2047378b9f76b';

/**
 * @swagger
 * /spoonacular/search:
 *   get:
 *     summary: Search for recipes from Spoonacular
 *     description: Search for recipes using a query parameter on Spoonacular
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The search term to find recipes
 *     responses:
 *       200:
 *         description: Successfully fetched search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   image:
 *                     type: string
 *       400:
 *         description: Bad request (invalid or missing query parameter)
 *       500:
 *         description: Server error (failure to fetch from Spoonacular)
 */
router.get("/search", async (req, res) => {
    const { query } = req.query;
  
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }
  
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}`
      );
  
      res.status(200).json(response.data.results); // Return the search results
    } catch (error) {
      console.error("Error fetching search results:", error);
      res.status(500).json({ message: "Failed to fetch search results" });
    }
  });
  

/**
 * @swagger
 * /spoonacular/random:
 *   get:
 *     summary: Get random recipes from Spoonacular
 *     description: Fetch random recipes from the Spoonacular API
 *     parameters:
 *       - in: query
 *         name: number
 *         schema:
 *           type: integer
 *         description: The number of random recipes to fetch
 *     responses:
 *       200:
 *         description: A list of random recipes from Spoonacular
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: Server error or Spoonacular API failure
 */
router.get('/random', async (req, res) => {
    const { number = 4 } = req.query; // Default to 4 recipes if not provided
  
    try {
      const response = await axios.get(SPOONACULAR_RANDOM_RECIPE_URL, {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          number, // Number of random recipes to fetch
        },
      });
  
      if (!response.data || !response.data.recipes) {
        throw new Error('No recipes returned from Spoonacular');
      }
  
      res.status(200).json(response.data.recipes); // Return the random recipes
    } catch (error) {
      console.error('Error fetching random recipes from Spoonacular:', error);
      res.status(500).json({ message: 'Failed to fetch random recipes' });
    }
  });
  
/**
 * @swagger
 * /spoonacular/cuisine:
 *   get:
 *     summary: Fetch recipes by cuisine from Spoonacular
 *     description: Fetches recipes based on a specific cuisine
 *     parameters:
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the cuisine (e.g., Italian, Chinese, etc.)
 *     responses:
 *       200:
 *         description: Successfully fetched recipes by cuisine
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   image:
 *                     type: string
 *       400:
 *         description: Bad request (missing or invalid query parameter)
 *       500:
 *         description: Server error (failure to fetch recipes by cuisine)
 */
router.get('/cuisine', async (req, res) => {
    const { cuisine } = req.query;
  
    if (!cuisine) {
      return res.status(400).json({ message: 'Cuisine query parameter is required' });
    }
  
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&cuisine=${cuisine}`
      );
  
      res.status(200).json(response.data.results);
    } catch (error) {
      console.error('Error fetching recipes by cuisine:', error);
      res.status(500).json({ message: 'Failed to fetch recipes by cuisine' });
    }
  });

  /**
 * @swagger
 * /spoonacular/recipe/{id}:
 *   get:
 *     summary: Fetch recipe details by ID from Spoonacular
 *     description: Fetch detailed information for a specific recipe using its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the recipe to fetch
 *     responses:
 *       200:
 *         description: Successfully fetched recipe details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 image:
 *                   type: string
 *                 instructions:
 *                   type: string
 *       400:
 *         description: Bad request (invalid or missing ID)
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error (e.g., failure to fetch data from Spoonacular)
 */
router.get('/recipe/:id', async (req, res) => {
    const { id } = req.params; // Fetch recipe ID from the path
  
    if (!id) {
      return res.status(400).json({ message: 'Recipe ID is required' }); // Ensure ID is provided
    }
  
    try {
      const resp = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`
      );
  
      if (resp.status === 200) {
        res.status(200).json(resp.data); // Return recipe details
      } else {
        res.status(404).json({ message: 'Recipe not found' }); // Handle missing recipe
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      res.status(500).json({ message: 'Failed to fetch recipe details' }); // Handle server errors
    }
  });
  
  

module.exports = router;
