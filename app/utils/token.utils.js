import jwt from 'jsonwebtoken';

const isValidToken = (token) => {
    try {
        const {verify} = jwt;
        const user = verify(token, process.env.HC_JWT_SECRET);
        return user !== null && user !== undefined;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const generateToken = (payload) => {
    const {sign} = jwt;
    return sign({payload}, process.env.HC_JWT_SECRET, {
        expiresIn: process.env.HC_JWT_DURATION
    });
}

export default {
    isValidToken,
    generateToken
};
