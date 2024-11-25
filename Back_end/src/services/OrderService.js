const Order = require("../models/OrderProduct");
const User = require("../models/UserModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      paymentMethod,
      totalPrice,
      user,
    } = newOrder;

    try {
      // Kiểm tra nếu đơn hàng rỗng
      if (!orderItems || orderItems.length === 0) {
        resolve({
          status: "Error",
          message: "No order items",
        });
        return;
      }

      // Tạo đơn hàng mới
      const createdOrder = await Order.create({
        orderItems,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
        user,
      });

      resolve({
        status: "OK",
        message: "Order created successfully",
        data: createdOrder,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getOrderOfUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Kiểm tra người dùng có tồn tại
      const user = await User.findById(userId);

      if (!user) {
        return resolve({
          status: "ERR",
          message: "User not found",
        });
      }

      // Tìm tất cả đơn hàng liên quan đến người dùng
      const userOrders = await Order.find({ user: userId });

      if (userOrders.length === 0) {
        return resolve({
          status: "ERR",
          message: "No orders found for this user",
        });
      }

      resolve({
        status: "OK",
        message: "Orders retrieved successfully",
        data: userOrders,
      });
    } catch (error) {
      reject({
        status: "ERR",
        message: "An error occurred while fetching orders",
        error: error.message,
      });
    }
  });
};



const deleteOrder = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm và xóa đơn hàng
      const deletedOrder = await Order.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        return resolve({
          status: "ERR",
          message: "Order not found",
        });
      }

      resolve({
        status: "OK",
        message: "Order deleted successfully",
        data: deletedOrder,
      });
    } catch (error) {
      reject({
        status: "ERR",
        message: "An error occurred while deleting the order",
        error: error.message,
      });
    }
  });
};

module.exports = {
  createOrder,
  getOrderOfUser,
  deleteOrder
};