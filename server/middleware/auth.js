import jwt from 'jsonwebtoken';
import { Host, User } from '../constants/role.js';

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
    try {
        // Get token from header
        const token = req.header('authorization')?.split(" ")[1];

        let decodedData;

        if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

        // Verify and decode token
        decodedData = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

        // Confirm account is a user and not a host
        if (decodedData?.user.role != User) {
            return res.status(401).json({ msg: 'User account required for access' });
        }

        req.user = decodedData?.user;

        next(); // Move onto the next request
    } catch (error) {
        res.status(401).json({ msg: 'Invalid Token' });
        console.log(error);
    }
}

// Auth method to confirm only a host has access using jwt
export const authHost = (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('authorization')?.split(" ")[1];

        let decodedData;

        // Confirm token is present
        if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

        // Verify and decode token
        decodedData = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

        // Confirm account is a host and not a user
        if (decodedData?.user.role != Host) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        req.user = decodedData?.user;

        next(); // Move onto the next request
    } catch (error) {
        res.status(401).json({ msg: 'Invalid Token' });
        console.log(error);
    }
}
