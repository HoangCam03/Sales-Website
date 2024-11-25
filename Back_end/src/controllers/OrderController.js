const OrderService = require("../services/OrderService");
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,

      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // Kiểm tra các trường bắt buộc
    if (
      !orderItems ||
      !shippingAddress ||
  
      itemsPrice === undefined ||
      shippingPrice === undefined ||
      totalPrice === undefined
    ) {
      return res.status(400).json({
        status: "Error",
        message: "Missing required fields",
      });
    }

    // Lấy user từ token (nếu cần)
    const user = req.user.id;

    // Gọi service để tạo đơn hàng
    const result = await OrderService.createOrder({

      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      totalPrice,
      user,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderOfUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: 'ERR',
        message: 'The userId is required'
      });
    }
    const response = await OrderService.getOrderOfUser(userId);
    return res.status(200).json(response); // Trả về kết quả khi thành công
  } catch (error) {
    console.error(error); // Log lỗi để debug
    return res.status(400).json({ message: error.message }); // Trả về lỗi
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(400).json({
        status: 'ERR',
        message: 'The orderId is required'
      });
    }
    const response = await OrderService.deleteOrder(orderId);
    return res.status(200).json(response); // Trả về kết quả khi thành công
  } catch (error) {
    console.error(error); // Log lỗi để debug
    return res.status(400).json({ message: error.message }); // Trả về lỗi
  }
};

module.exports = {
  createOrder,
  getOrderOfUser,
  deleteOrder
};