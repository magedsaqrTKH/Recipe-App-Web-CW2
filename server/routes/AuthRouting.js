const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsersModel = require('../models/User')


const router = express.Router()
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user
 *               password:
 *                 type: string
 *                 description: The password for the new user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or invalid input
 *       500:
 *         description: Server error
 */

router.post("/register", async (req,res) => {
    const {username,password} = req.body
    const user = await UsersModel.findOne({username})

    if(user){
        return res.json({message: "user already exists!!"})
    }

    const hashedPass = await bcrypt.hash(password, 10)
    const newUser = new UsersModel({username, password: hashedPass})
    newUser.save()

    res.json({message: "user created succesfully"})
})

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns a token
 *       400:
 *         description: Missing or invalid input
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.post("/login", async (req,res) => {
    const {username,password} = req.body
    const user = await UsersModel.findOne({username})

    if(!user){
        return res.json({message: "User Does Not Exist!!"})
    }

    const passValid = await bcrypt.compare(password, user.password)
     if (!passValid){
        return res.json({message: "Password is Invalid!!"})
     }
     
     const token = jwt.sign({id: user._id}, "secret")
     res.json({ token, userID: user._id })
})


module.exports = router