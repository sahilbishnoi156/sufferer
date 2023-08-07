import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  given_name:{
    type: String,
    required: [true, 'FirstName is required!'],
  },
  family_name:{
    type: String,
    default: "",
  },
  about:{
    type: String,
    default: "",
  },
  followers:{
    type: Array,
    default: [], 
  },
  followings:{
    type: Array,
    default: [],
  },
  username: {
    type: String,
    unique:[true, 'Username already exists!'],
    default:undefined,
  },
  password:{
    type:String,
    default:undefined,
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

export default User;