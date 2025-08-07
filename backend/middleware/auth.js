const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// Auth0 configuration
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || 'your-auth0-domain.auth0.com';
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || 'your-weather-api';

// Create JWKS client
const client = jwksClient({
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
});

// Function to get signing key
function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            callback(err);
            return;
        }
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: 'Access denied. No token provided.'
        });
    }

    const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader;

    jwt.verify(token, getKey, {
        audience: AUTH0_AUDIENCE,
        issuer: `https://${AUTH0_DOMAIN}/`,
        algorithms: ['RS256']
    }, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(403).json({
                error: 'Invalid token.'
            });
        }

        req.user = decoded;
        next();
    });
};

// Middleware to check if user has required permissions
const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            error: 'Authentication required.'
        });
    }
    next();
};

module.exports = {
    verifyToken,
    requireAuth
};