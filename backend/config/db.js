const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    // console.log(
    //   `DataBase Connection:,
    //      ${connect.connection.host},
    //      ${connect.connection.name}
    //      `
    // );
  } catch (error) {
    console.log(`Error:${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
