import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';
import hostRouter from './routes/host.js';
import testRouter from './routes/test.js';

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

// Define Routes
app.use('/users', userRouter);
app.use('/hosts', hostRouter);
app.use('/tests', testRouter);

app.use(cors());

const PORT = process.env.PORT || 8080;

// Perform a promise when connection is successful and catch when not successful.
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
