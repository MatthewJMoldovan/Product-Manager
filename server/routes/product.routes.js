const express = require('express');

const { 
    handleCreateProduct,
    handleGetAllProducts,
    handleGetProductById,
    handleUpdateProductById,
    handleDeleteProductById
    } = require('../controllers/product.controller');

const router = express.Router();

router.post('/', handleCreateProduct);
router.get('/', handleGetAllProducts);
router.get('/:id', handleGetProductById)
router.put('/:id', handleUpdateProductById )
router.delete('/:id', handleDeleteProductById)

module.exports = {
    productRouter: router
}