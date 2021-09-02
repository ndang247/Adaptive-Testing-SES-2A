import mongoose from "mongoose";

const testSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    tite: { type: String, require: true },
    participantIds: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    maximumAttempts: { type: Number, require: true },
    questionIds: { type: [mongoose.Schema.Types.ObjectId], ref: "Question" },
    dateCreated: { type: Date, default: new Date() },
    expiryDate: { type: Date, require: true },
    testLength: { type: Number, require: true },
    scoreIds: { type: [mongoose.Schema.Types.ObjectId], ref: "Score" },
    contentType: { type: String, require: true }
});

export default mongoose.model("Test", testSchema);