import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    picturePath: {
        type: String,
        default: ''
    },
    userPicturePath: {
        type: String,
        default: ''
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;