const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {Schema} = mongoose;

const userSchema = new Schema({
  first_name:{
    type: String,
    required:true
  },
  last_name:{
    type: String,
    required:true
  },
  email:{
    type: String,
    required:true,
    unique:true
  },
  password:{
    type: String,
    required:true,
    select:false
  },
  role:{
    type: String,
    required:true,
    enum:['user','admin', 'superAdmin'],
    default:'user'
  },
  avatar:{
    type: String,
    default:'https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph'

  },
  phone_number:{
    type: String
  },
  cart_items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }],
  address:{
    type : String
  }
})

//hashing password in  mongoose middleware before saving user in db(document middleware)
userSchema.pre('save', async function(){
  const currentUser = this;
  if(currentUser.isModified('password')){
    const hashedPassword = await bcrypt.hash(currentUser.password,10)
    currentUser.password = hashedPassword
  }
})

const User = mongoose.model('User',userSchema);
module.exports =User;
