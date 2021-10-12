import mongoose from "mongoose";

const querySchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    query: { type: String, require: true },
    dateCreated: { type: Date, default: new Date() },
});

export default mongoose.model("Query", querySchema);