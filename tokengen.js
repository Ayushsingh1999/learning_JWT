// Node.js example to generate secure random secrets

const crypto = require('crypto');

// Generate Access Token Secret
const accessTokenSecret = crypto.randomBytes(64).toString('hex');
console.log('ACCESS_TOKEN_SECRET:', accessTokenSecret);

// Generate Refresh Token Secret
const refreshTokenSecret = crypto.randomBytes(64).toString('hex');
console.log('REFRESH_TOKEN_SECRET:', refreshTokenSecret);
