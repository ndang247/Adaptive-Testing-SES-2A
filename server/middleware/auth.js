import jwt from 'jsonwebtoken';
import { Host, User } from '../models/role.js';

// Auth method to confirm any user has access using jwt
export const auth = (req, res, next) => {
    try {
        const token = req.header('authorization')?.split(" ")[1];

        let decodedData;

        if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

        decodedData = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

        req.user = decodedData?.user;

        next(); // Move onto the next request
    } catch (error) {
        res.status(401).json({ msg: 'Invalid Token' });
        console.log(error);
    }
}


// Auth method to confirm only a user has access using jwt
export const authUser = (req, res, next) => {
    // Get token from header
    const token = req.header('authorization').split(" ")[1];

    // Confirm token is present
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    // Verify and decode token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

        // Confirm account is a user and not a host
        if (decoded?.user.role != User) {
            return res.status(401).json({ msg: 'User account required for access' });
        }

        req.user = decoded?.user;
        next(); // Move onto the next request
    } catch (error) {
        res.status(401).json({ msg: 'Invalid Token' });
    }
}

// Auth method to confirm only a host has access using jwt
export const authHost = (req, res, next) => {
    // Get token from header
    const token = req.header('authorization').split(" ")[1];

    // Confirm token is present
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    // Verify and decode token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

        // Confirm account is a host and not a user
        if (decoded?.user.role != Host) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        req.user = decoded?.user;
        next(); // Move onto the next request
    } catch (error) {
        res.status(401).json({ msg: 'Invalid Token' });
    }
}
