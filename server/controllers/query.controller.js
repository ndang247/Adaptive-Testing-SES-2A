import QueryModel from '../models/query.js';
import { validationResult } from 'express-validator';
import { DateTime } from 'luxon';

export const createQuery = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { creatorId, fullName, email, query } = req.body;

    try {
        // Create new query
        const newQuery = new QueryModel({
            creatorId,
            fullName,
            email,
            query,
            dateCreated: DateTime.now()
        });

        // Post query to database
        await newQuery.save();

        res.status(201).json({ msg: 'Query sent' });
    } catch (error) {
        console.log(error);
    }
}
