import jwt from'jsonwebtoken';
import dotenv from 'dotenv';

//Auth method to confirm user has access using json web token
export default function(req, res, next){
    //get token from header
    const token = req.header('x-auth-token');

    // confirm token is present
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // verify and decode token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        
        req.user = decoded.user;
        next(); //move onto the next request
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}