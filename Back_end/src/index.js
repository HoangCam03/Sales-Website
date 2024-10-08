
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Thay vì dùng bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Thay vì dùng bodyParser.urlencoded()

const routes = require('./routes/api')
// Giả sử bạn có một file routes.js để định nghĩa các route
routes(app);
mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log('Connect DB success!');
  })
  .catch(err => {
    console.error(err);
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});