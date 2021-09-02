import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    testIds: { type: [mongoose.Schema.Types.ObjectId], ref: "Test" },
    userIds: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    title: { type: String, require: true },
    rating: { type: Number, require: true },
    dateCreated: { type: Date, default: new Date() }
});

export default mongoose.model("Score", scoreSchema);
