const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
  receipt: {
    type: Number
  },
  name: {
    type: String
  },
  college:{
      type:String
  },
  phone:{
      type:String
  },
  rollno:{
      type:String
  },
  email:{
      type:String
  },
  paymentMode:{
      type:String
  }
})

module.exports = mongoose.model('User', User)