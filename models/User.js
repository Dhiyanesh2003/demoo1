const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profilePicUrl: { type: String },
    authUsed: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }
});

module.exports = mongoose.model("User", UserSchema);