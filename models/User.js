const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      mail: {
        type: String,
      },
      password : {
          type : String,
          required : true
      },
      admin : {
          type : Boolean,
          default : true
      }
      });
      
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
