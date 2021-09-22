import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';
import hostRouter from './routes/host.js';
import testRouter from './routes/test.js';
import questionRouter from './routes/question.js'

const app = express();
dotenv.config();

// Since this is deprecated, Express now has the function of body-parser built in since V4.16 version. 
app.use(express.json({
    limit: "30mb",
    extended: true
}));

app.use(express.urlencoded({
    limit: "30mb",
    extended: true
}));
// References:
// https://stackoverflow.com/questions/62396498/tslint-marks-body-parser-as-deprecated.

app.use(cors());

// Define Routes
app.use('/api/users', userRouter);
app.use('/api/hosts', hostRouter);
app.use('/api/tests', testRouter);
app.use('/api/questions', questionRouter);
app.use('/api/scores', testRouter);


const PORT = process.env.PORT || 8080;

// Perform a promise when connection is successful and catch when not successful.
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
