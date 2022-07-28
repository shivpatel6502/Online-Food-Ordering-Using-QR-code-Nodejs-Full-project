const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.MONGODB_URL, connectionParams);
    console.log("Connected to Mongo DB");
  } catch (err) {
    console.log("Error in connecting DB");
    console.log(err);
  }
};
