const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true }, // Sửa `require` thành `required`
        amount: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    paymentMethod: { type: String, default: false },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: false },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    isPaid: { type: Boolean, default: false }, // Sửa `idPaid` thành `isPaid` để nhất quán
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }, // Sửa `delivereAt` thành `deliveredAt` để chính xác
  },
  {
    timestamps: true, // Tự động thêm `createdAt` và `updatedAt`
  }
);

const Order = mongoose.model("Order", orderSchema); // Đổi tên `User` thành `Order`
module.exports = Order;
