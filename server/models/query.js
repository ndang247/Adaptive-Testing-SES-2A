import mongoose from "mongoose";

const querySchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    query: { type: String, require: true },
    dateCreated: { type: Date, default: new Date() },
});

export default mongoose.model("Query", querySchema);