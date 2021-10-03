import jwt from 'jsonwebtoken';

// Auth method to confirm any user has access using json web token
export const auth = (req, res, next) => {
    // get token from header
    const token = req.header('authorization').split(" ")[1];
    
    // confirm token is present
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    
    // verify and decode token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.user = decoded?.user;

        next(); // move onto the next request
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}


// Auth method to confirm only a user has access using json web token
export const authUser = (req, res, next) => {
    // get token from header
    const token = req.header('authorization').split(" ")[1];

    // confirm token is present
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    // verify and decode token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

        // confirm account is a user and not a host
        if (decoded?.user.role != "User") {
            return res.status(401).json({ msg: 'User account required for access' });
        }

        req.user = decoded?.user;
        next(); // move onto the next request
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

// Auth method to confirm only a host has access using json web token
export const authHost = (req, res, next) => {
    // get token from header
    const token = req.header('authorization').split(" ")[1];

    // confirm token is present
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    // verify and decode token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

        // confirm account is a host and not a user
        if (decoded?.user.role != "Host") {
            return res.status(401).json({ msg: 'Host account required for access' });
        }

        req.user = decoded?.user;
        next(); // move onto the next request
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

