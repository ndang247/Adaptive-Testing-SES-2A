import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    currentRating: { type: Number, require: true },
    progressiveRatings: { type: [Number], require: true },
    answeredQuestionIds: { type: [mongoose.Schema.Types.ObjectId], ref: "Question" },
    dateCreated: { type: Date, default: new Date() }
});

export default mongoose.model("Score", scoreSchema);
