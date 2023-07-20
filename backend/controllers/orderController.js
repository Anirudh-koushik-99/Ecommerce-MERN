import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc Create new Order
//Route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(200).json(createOrder);
  }
});

//@desc Get logged in users orders
//Route GET /api/orders/mine
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id});
  if (orders) {
    res.status(200).json(orders)
  } else {
    res.status(404)
    throw new Error("No orders");
  }
});

//@desc Get order by ID
//Route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
      res.status(200).json(order)
    } else {
      res.status(404)
      throw new Error("Order not found");
    }
});

//@desc Update order to paid
//Route PUT /api/orders/:id/pay
//@access Private/Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update order to paid");
});

//@desc Update order to delivered
//Route PUT /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update order to delivered");
});

//@desc Get all orders
//Route GET /api/orders
//@access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  res.send("Get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};
