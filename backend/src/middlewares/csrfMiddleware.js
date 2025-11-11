import crypto from 'crypto';

/**
 * CSRF Token Middleware
 * Implements Double Submit Cookie pattern to prevent Cross-Site Request Forgery attacks
 * 
 * Pattern: Token stored in cookie + sent in header, server validates they match
 */

// Token expiration time (24 hours, same as JWT token)
const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000;

/**
 * Generate a CSRF token and set it in cookie
 * Only generates a new token if one doesn't exist in the cookie
 */
export const generateCsrfToken = (req, res, next) => {
  // Check if token already exists in cookie
  const existingToken = req.cookies['csrf-token'];
  
  if (existingToken) {
    // Token exists, use it and attach to request
    req.csrfToken = existingToken;
    // Also send in response header for client convenience
    res.setHeader('X-CSRF-Token', existingToken);
    return next();
  }
  
  // Generate a new random token
  const token = crypto.randomBytes(32).toString('hex');
  
  // Set token in cookie (sameSite: 'none' to match JWT cookie settings for cross-origin)
  res.cookie('csrf-token', token, {
    httpOnly: false, // Client-side JavaScript needs to read this to send in headers
    secure: true, // Only send over HTTPS
    sameSite: 'none', // Match JWT cookie settings for cross-origin requests
    maxAge: TOKEN_EXPIRATION,
    path: '/'
  });
  
  // Also send token in response header
  res.setHeader('X-CSRF-Token', token);
  
  // Attach token to request for easy access
  req.csrfToken = token;
  
  next();
};

/**
 * Validate CSRF token using Double Submit Cookie pattern
 * Compares token from cookie with token from header
 */
export const validateCsrfToken = (req, res, next) => {
  // Skip CSRF validation for GET, HEAD, OPTIONS requests (read-only operations)
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }
  
  // Get token from cookie
  const tokenFromCookie = req.cookies['csrf-token'];
  
  // Get token from header (client should send this in X-CSRF-Token header)
  const tokenFromHeader = req.headers['x-csrf-token'] || req.headers['X-CSRF-Token'];
  
  // Check if both tokens exist
  if (!tokenFromCookie) {
    return res.status(403).json({ 
      message: 'CSRF token missing from cookie',
      error: 'CSRF protection: Token cookie not found'
    });
  }
  
  if (!tokenFromHeader) {
    return res.status(403).json({ 
      message: 'CSRF token missing from header',
      error: 'CSRF protection: Please include X-CSRF-Token header in your request'
    });
  }
  
  // Validate that both tokens match (Double Submit Cookie pattern)
  if (tokenFromCookie !== tokenFromHeader) {
    return res.status(403).json({ 
      message: 'CSRF token mismatch',
      error: 'CSRF protection: Token validation failed. Tokens do not match.'
    });
  }
  
  // Token is valid, proceed
  next();
};

export default { generateCsrfToken, validateCsrfToken };

