import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js"

//@desc Create new Order
//Route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems } = req.body;


    res.status(200).json({
    
    })
    res.send('add order items')
})

//@desc Get logged in users orders
//Route GET /api/orders/mine
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {

    res.send('get my orders items')
})

//@desc Get order by ID
//Route GET /api/orders/:id
//@access Private/Admin
const getOrderById = asyncHandler(async (req, res) => {

    res.send('get order by Id')
})

//@desc Update order to paid
//Route PUT /api/orders/:id/pay
//@access Private/Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {

    res.send('Update order to paid')
})

//@desc Update order to delivered
//Route PUT /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {

    res.send('Update order to delivered')
})

//@desc Get all orders
//Route GET /api/orders
//@access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {

    res.send('Get all orders')
})



export {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders}

