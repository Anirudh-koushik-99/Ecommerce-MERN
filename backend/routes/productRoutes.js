import express from "express";


const router = express.Router();

import {getProdcutById, getProdcuts} from '../controllers/productController.js'

router.route('/').get(getProdcuts);
router.route('/:id').get(getProdcutById);

export default router 