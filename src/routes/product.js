const express = require("express");
const Product = require("../models/product");
const Category = require("../models/category");

const productsRouter = express();
const productRouter = express();



productsRouter.get("/", async (req, res) => {
    let product = await Product.find({})

    try {
        res.status(200).json(product)
    } catch (error) {
        res.status(500).end(`<h1>${error}</h1>`)
    }
})

productRouter.get('/:id', async (req, res) => {
    let product = await Product.findById(req.params.id)
    
    try {
        res.status(200).json(product)
        
    } catch (error) {
        res.status(422)
    }
})

productsRouter.post('/:id/post', async (req, res) =>{

    let { name, price, description, images } = req.body

    let newProduct = new Product({
        name,
        price,
        description,
        images,
        category: req.params.id
    });

    try {
        await newProduct.save();
        let productSave = await Category.findById(req.params.id).populate('products');
        productSave.products.push(newProduct);
        await productSave.save();

        res.status(200).redirect('/products')
    } catch (error) {
        res.status(500).end(`<h1>${error}</h1>`)
    }
})

module.exports = {
    products: productsRouter,
    product: productRouter
}