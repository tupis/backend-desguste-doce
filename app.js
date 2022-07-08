const express = require("express");
require("dotenv").config();
require('./config/database');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

const Category = require("./src/models/category");
const Product = require('./src/models/product');

const categoryRouter = require('./src/routes/category');
const productsRouter = require('./src/routes/product');
const productRouter = require('./src/routes/product');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/category', categoryRouter);
app.use('/products', productsRouter.products);
app.use('/product', productRouter.product)

app.get("/", (req, res) => {
    try {
        res.end("<h1>Home</h1>")
    } catch (error) {
        res.status(422);
    }
})

app.listen(port, () => {
    try {
        console.log("Servidor iniciado =)")
    } catch (error) {
        console.log("Não foi possível iniciar o servidor =(")
    }
})