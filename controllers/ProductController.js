const express = require('express');
const Product = require('../models/ProductModel');


//get all the products
const getAllProducts = async (req, res) => {
    try {
        const product = await Product.find().sort({
            createdAt: -1,
        });
        res.status(200).json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })

    }
}

//get all subcategories
const getSubcategories = async (req, res) => {
    try {
        const brands = await Brand.find({}); // Fetch all brands
        const subcategories = brands.reduce((acc, brand) => {
            // Extract individual subcategories from each brand's subcategories array
            brand.subcategories.forEach(subcategory => {
                if (!acc.includes(subcategory)) {
                    acc.push(subcategory);
                }
            });
            return acc;
        }, []);

        res.status(200).json(subcategories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Subcategories not available' });
    }
}


module.exports = {
    getAllProducts,
    getSubcategories
}