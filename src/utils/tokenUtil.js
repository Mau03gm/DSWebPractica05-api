const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied, missing token' });

    if (isTokenRevoked(token)) {
        return res.status(401).json({ message: 'Revoqued token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

const revokedTokens = new Set();

const revokeToken = (token) => {
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    revokedTokens.add(tokenWithoutBearer);
    console.log(revokedTokens);
};


const isTokenRevoked = (token) => {
    return revokedTokens.has(token);
};

module.exports = { generateToken, verifyToken, revokeToken, isTokenRevoked };