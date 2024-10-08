const User = require("../models/UserModel");
const bcrypt = require("bcrypt"); ///????
const { genneralAccessToken, genneralRefreshToken } = require("./jstService");
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone,confirmPassword } = newUser;

    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ok",
          message: " The email is already",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      console.log("hash", hash);
      const createUser = await User.create({
        name,
        email,
        password: hash, ///cho hash vao passw
        phone,
        confirmPassword,
      });
      if (createUser) {
        resolve({
          status: "Ok",
          message: " Success",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone } = userLogin;

    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ok",
          message: " The user is not defined",
        });
      }
      console.log("id from DB:", checkUser.id);
      
      console.log("Hashed password from DB:", checkUser.password);
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      console.log("comparePassword", comparePassword);
      // if(che)
      // const createUser = await User.create({
      //   name,
      //   email,
      //   password: hash,///cho hash vao passw
      //   phone
      // })
      if (!comparePassword) {
        resolve({
          status: "Ok",
          message: "password or user is not true",
        });
      }

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });


      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      console.log("access_token:", access_token);
      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (Id, data) => {

  return new Promise(async (resolve, reject) => {

    try {
      const checkUser = await User.findOne({
        _id: Id
      })

      console.log('checkUser: ', checkUser );


      if (checkUser === null) {
        resolve({
          status: "ok",
          message: " The user is not defined",
        });
      }
      
      const updateUser = await User.findByIdAndUpdate(Id, data, {new : true});
      console.log('updateUser', updateUser);

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateUser  
      });
    } catch (e) {
      reject(e);
    }
  });

};

const deleteUser = (Id) => {

  return new Promise(async (resolve, reject) => {

    try {
      const checkUser = await User.findOne({
        _id: Id
      })

      console.log('checkUser: ', checkUser );


      if (checkUser === null) {
        resolve({
          status: "ok",
          message: " The user is not defined",
        });
      }
      
      await User.findByIdAndDelete(Id);

      resolve({
        status: "OK",
        message: "Delete SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });

};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser
};
