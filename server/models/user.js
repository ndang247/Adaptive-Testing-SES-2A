import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    avatar: { type: String },
    role: { type: String, require: true },
    dateCreated: { type: Date, default: new Date() },
    scoreIds: { type: [mongoose.Schema.Types.ObjectId], ref: "Score" }
});

export default mongoose.model("User", userSchema);
