import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
  likes: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  shares: {
    type: Number,
  },
  date: {
    type: String,
    default: Date.now,
  },
});
PostSchema.set("toJSON", { getters: true, virtuals: false, minimize: false });
const Post = models.Post || model("Post", PostSchema);

export default Post;
