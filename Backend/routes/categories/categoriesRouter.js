const express = require("express");
const { createCategory, getAllCategories, deleteCategory, updateCategory,  } = require('../../controllers/categories/categoriesController');
const isLoggedIn = require('../../middlewares/isLoggedIn');



const categoriesRouter = express.Router();

//!Register Route
categoriesRouter.post("/", isLoggedIn, createCategory);

//!Get all categories Route
categoriesRouter.get('/',getAllCategories)

//!Delete categories Route
categoriesRouter.delete('/:id',isLoggedIn,deleteCategory)

//!Update categories Route
categoriesRouter.put('/:id',isLoggedIn,updateCategory)

module.exports = categoriesRouter;