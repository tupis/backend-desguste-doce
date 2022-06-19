const express = require("express");
const Product = require("../models/product");
const Category = require("../models/category");

const ola = () =>{
    console.log()
}

function Teste(teste=ola()) {
    console.log()
    teste()
}


const productRouter = express();

productRouter.get("/", async (req, res) => {
    let product = await Product.find({})

    try {
        res.status(200).json(product)
    } catch (error) {
        res.status(500).end(`<h1>${error}</h1>`)
    }
})

productRouter.post('/:id/post', async (req, res) =>{

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

module.exports = productRouter;