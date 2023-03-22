const { model } = require('mongoose');
const { Product } = require('../models/product.model')

const handleCreateProduct = async (req,res) => {
    console.log('controller: handleCreateProduct', req.body);

    try {
        const product = await Product.create(req.body);
        return res.json(product)
    } catch (error) {
        return res.status(400).json({ ...error, message: error.message});
    }
};

const handleGetAllProducts = async (req,res) => {
    console.log('controller: handleGetAllProducts');
    try {
        const products = await Product.find()
        return res.json(products)
    } catch (error) {
        return res.status(400).json({ ...error, message: error.message});
    }
}

const handleGetProductById = async (req,res) => {
    console.log('controller: handleGetProductById', req.params);
    try {
        const product = await Product.findById(req.params.id)
        return res.json(product)
    } catch (error) {
        return res.status(400).json({ ...error, message: error.message});
    }
}

const handleUpdateProductById = async (req, res) => {
    console.log('controller: handleUpdateProductById', req.params, req.body);
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });
        return res.json(product)
    } catch (error) {
        return res.status(400).json({ ...error, message: error.message});
    }
}

const handleDeleteProductById = async (req,res) => {
    console.log('controller: handleDeleteProductById', req.params);
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        return res.json(product)
    } catch (error) {
        return res.status(400).json({ ...error, message: error.message});
    }
}

module.exports = {
    handleCreateProduct,
    handleGetAllProducts,
    handleGetProductById,
    handleUpdateProductById,
    handleDeleteProductById
}