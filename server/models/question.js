import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    // testIds: { type: [mongoose.Schema.Types.ObjectId], ref: "Test" },
    category: { type: String, require: true },
    content: { type: String, require: true },
    rating: { type: Number, require: true },
    difficulty: { type: String, require: true },
    correctAnswer: { type: String, require: true },
    answers: { type: [String], require: true }
});

export default mongoose.model("Question", questionSchema);
