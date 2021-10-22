import TestModel from '../models/test.js';
import ScoreModel from '../models/score.js';
import { validationResult } from 'express-validator';
import { createQuestion, shuffle } from './question.controller.js';
import mongoose from 'mongoose';

export const getTestsByCreator = async (req, res) => {
    const { creatorId } = req.params;

    try {
        const tests = await TestModel.find({ creatorId })
            .populate({ path: "creatorId" })
            .populate({ path: "questionIds" })
            .populate({ path: "scoreIds" });

        res.status(200).json(tests);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const getTestById = async (req, res) => {
    const { id } = req.params;

    try {
        const test = await TestModel.findById(id)
            .populate({ path: "creatorId" })
            .populate({ path: "questionIds" })
            .populate({ path: "scoreIds" });

        shuffle(test.questionIds);

        res.status(200).json(test);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const createTest = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const {
        creatorId,
        title,
        questions,
        expiryDate,
        contentType
    } = req.body;

    const questionIds = await createQuestion(questions);

    const newTest = new TestModel({
        creatorId,
        title,
        questionIds,
        dateCreated: new Date(),
        expiryDate,
        scoreIds: [],
        contentType
    });

    try {
        await newTest.save();

        res.status(201).json(newTest);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const validatePin = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { pin } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(pin)) return res.status(400).json('Invalid pin');

        // Find one test based on pin
        const test = await TestModel.findById(pin)
            .populate({ path: "creatorId" })
            .populate({ path: "questionIds" })
            .populate({ path: "scoreIds" });


        if (!test) return res.status(400).json({ msg: 'Invalid pin' });

        // Optional as this condition is unnecessary 
        // If pin is not match return an error msg
        if (String(test?._id) !== pin) return res.status(400).json({ msg: 'Invalid pin' });

        shuffle(test.questionIds);
        // Return test if valid
        res.json(test);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const getTestHistory = async (req, res) => {
    const { _id } = req.user;
    // const { user_id } = req.params;

    try {
        const scores = await ScoreModel.find({ userId: _id })
            .populate({
                path: "testId",
                populate: { path: "questionIds" }
            })
            .populate({ path: "userId" });

        res.status(200).json(scores);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}
