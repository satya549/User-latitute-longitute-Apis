import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true,
    },
    address: {
        type: String,
        required:true,
        coordinates: [],
    },
    latitude: {
        type: String,
        required:true,
    },
    longitude: {
        type: String,
        required:true,
    },
    status: {
        type: String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now  
    }

});


const UserModel =  mongoose.model("User",userSchema);
export default UserModel