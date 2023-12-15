const express = require('express');
const Product = require('../models/ProductModel');
const { getAllProducts } = require('../controllers/ProductController');


const router = express.Router();
router.use(express.json());

//allow url encoded
router.use(express.urlencoded({extended:false}));

//get all the products
router.get('/productlist', getAllProducts);


module.exports = router;