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
    let {name, options} = req.body
    let newCategory = new Category({
        name,
        options
    })
    try {
        await newCategory.save();
        res.status(200).redirect('/category');
    } catch (error) {
        res.status(400)
    }
})


module.exports = categoryRouter;