const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://krishanpareek996_db_user:krishanpareek997@cluster0.up77qdy.mongodb.net/"
  )
  .then(() => console.log("MongoDB Connection successfull"))
  .catch((error) => console.log(`Error occured: ${error}`));
