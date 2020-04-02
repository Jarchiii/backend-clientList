const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    genre : {
        type : String,
        enum : ["Mr", "Mme"],
        required : true
    },
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
      address : {
          type : String,
          required: true
      }
});
      
const clientModel = mongoose.model("Client", clientSchema);

module.exports = clientModel;