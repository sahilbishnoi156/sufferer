import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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
  savedPosts:{
    type:Array,
    default:[],
  },
  likedPosts:{
    type:Array,
    default:[],
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
  },
  userFrom: {
    type: String,
    default: Date.now, 
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;