import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js";

//@desc Fetch all products
//Route GET /api/products
//@access Public
const getProdcuts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})

//@desc Fetch signle product
//Route GET /api/products/:id
//@access Public
const getProdcutById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
       return res.json(product)
    }else{
        res.status(404);
        throw new Error('Resource not Found')
    }
})

export {getProdcuts, getProdcutById}