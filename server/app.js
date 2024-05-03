const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("./swaggerOptions")
const RecipesRouting = require('./routes/RecipesRouting')
const AuthRouting = require('./routes/AuthRouting')
const SpoonRoutes = require("../server/routes/SpoonRoutes")
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/auth', AuthRouting);
app.use('/recipes', RecipesRouting);
app.use('/spoonacular', SpoonRoutes);

mongoose.connect('mongodb+srv://magedsaqr10:magedsaqr2003@recipes.m66ltaq.mongodb.net/recipes',{useUnifiedTopology: true,
  useNewUrlParser: true}).then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection failure:', err));

app.use(cors({origin: 'http://localhost:3000',methods: ['GET', 'POST', 'PUT', 'DELETE'],allowedHeaders: ['Content-Type', 'Authorization']}));
app.use(bodyParser.json())

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server on port ${PORT} is running`);
});

module.exports = app;







