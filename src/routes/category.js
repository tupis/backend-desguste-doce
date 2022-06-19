const express = require("express");
const Category = require("../models/category");

const categoryRouter = express();

categoryRouter.get('/', async (req, res) => {
    try {
        let category = await Category.find({})
        res.status(200).json(category)
    } catch (error) {
        res.status(400).end(`<p> ${error} </p>`)
    }
})

categoryRouter.post('/post', async (req, res) => {
    let names = req.body.name
    let newCategory = new Category({
        name: names
    })
    try {
        await newCategory.save();
        res.status(200).redirect('/category');
    } catch (error) {
        res.status(400)
    }
})


module.exports = categoryRouter;