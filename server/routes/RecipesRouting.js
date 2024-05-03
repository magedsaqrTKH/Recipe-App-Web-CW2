const express = require('express')
const Recipe = require('../models/Recipe')

const router = express.Router()
/**
 * @swagger
 * /recipes/save:
 *   post:
 *     summary: Save a new recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               cuisines:
 *                 type: array
 *               ingredients:
 *                 type: array
 *               instructions:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               nutritionalInfo:
 *                 type: object
 *               ratings:
 *                 type: number
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Recipe saved successfully
 *       400:
 *         description: Recipe already exists
 *       500:
 *         description: Server error
 */

router.post('/save', async (req, res) => {
  const {id,title,image,cuisines,ingredients,instructions,difficulty,nutritionalInfo,ratings,price,} =req.body;

  try {
    const existingRecipe = await Recipe.findOne({ id })
    if (existingRecipe) {
      return res.status(400).json({ msg: 'Recipe already exists' })
    }
    const newRecipe = new Recipe({id,title,image,cuisines,ingredients,instructions,difficulty,nutritionalInfo,ratings,price,})
    await newRecipe.save()
    res.status(201).json({ msg: 'Recipe saved successfully' })

  } catch (error) {
    console.error('Error saving the recipe:', error)
    res.status(500).json({ msg: 'Failed to save the recipe' })
  }
})

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Retrieve all recipes
 *     responses:
 *       200:
 *         description: A list of all recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   image:
 *                     type: string
 *                   cuisines:
 *                     type: array
 *                   ingredients:
 *                     type: array
 *                   instructions:
 *                     type: string
 *                   difficulty:
 *                     type: string
 *                   nutritionalInfo:
 *                     type: object
 *                   ratings:
 *                     type: number
 *                   price:
 *                     type: number
 *       500:
 *         description: Server error
 */

router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    res.status(500).json({ msg: 'Failed to fetch recipes' })
  }
})

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID to delete
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findOneAndDelete({ id });
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.json({ msg: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting the recipe:', error);
    res.status(500).json({ msg: 'Failed to delete the recipe', error });
  }
});

module.exports = router
