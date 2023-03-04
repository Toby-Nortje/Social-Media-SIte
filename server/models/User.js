import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    friends: {
        type: Array,
        default: []
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    picturePath: {
        type: String,
        default: ''
    },
    location: {
        type: String,
    },
    occupation: {
        type: String,
    },
    viewedProfile: Number,
    impressions: Number
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;