const UserService = require("../services/UserService");

const createUser = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Kiểm tra dữ liệu từ request
    const { name, email, password, confirmPassword, phone } = req.body;

    console.log("Extracted email:", email); // Kiểm tra giá trị email

    const reg = /^[\w+\-._]+@[a-zA-Z\d\-]+\.[a-zA-Z]+$/; // Biểu thức chính quy đơn giản hơn
    const isCheckEmail = reg.test(email);

    console.log("IsCheckEmail:", isCheckEmail); // Đảm bảo log đúng giá trị isCheckEmail

    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        status: "Error",
        message: "The Input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "Error",
        message: "The Email is required",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "Error",
        message: "The password must equal",
      });
    }

    const result = await UserService.createUser(req.body);
    return res.status(200).json(result); // Trả về kết quả khi thành công
  } catch (error) {
    console.error(error); // Log lỗi để debug
    return res.status(400).json({ message: error.message }); // Trả về lỗi
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Kiểm tra dữ liệu từ request
    const { name, email, password, phone } = req.body;

    console.log("Extracted email:", email); // Kiểm tra giá trị email

    const reg = /^[\w+\-._]+@[a-zA-Z\d\-]+\.[a-zA-Z]+$/; // Biểu thức chính quy đơn giản hơn
    const isCheckEmail = reg.test(email);

    console.log("IsCheckEmail:", isCheckEmail); // Đảm bảo log đúng giá trị isCheckEmail

    if (!name || !email || !password || !phone) {
      return res.status(200).json({
        status: "Error",
        message: "The Input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "Error",
        message: "The Email is required",
      });
    // } else if (password !== confirmPassword) {
    //   return res.status(200).json({
    //     status: "Error",
    //     message: "The password must equal",
    //   });
    }

    const result = await UserService.loginUser(req.body);
    return res.status(200).json(result); // Trả về kết quả khi thành công
  } catch (error) {
    console.error(error); // Log lỗi để debug
    return res.status(400).json({ message: error.message }); // Trả về lỗi
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if(!userId){
      return res.status(200).json({
        status :'ERR',
        message:'The userId is require'
      })
    }
    console.log('userId', userId);

    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response); // Trả về kết quả khi thành công
  } catch (error) {
    console.error(error); // Log lỗi để debug
    return res.status(400).json({ message: error.message }); // Trả về lỗi
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const token = req.headers 

    if(!userId){
      return res.status(200).json({
        status :'ERR',
        message:'The userId is require'
      })
    }

    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response); // Trả về kết quả khi thành công
  } catch (error) {
    console.error(error); // Log lỗi để debug
    return res.status(400).json({ message: error.message }); // Trả về lỗi
  }
};

module.exports = {
  createUser,loginUser, updateUser, deleteUser
};
