/**
 * Sanitizes user input to prevent XSS attacks and NoSQL injection
 * Removes potentially dangerous HTML/script tags and sanitizes strings
 */

/**
 * Escapes HTML special characters to prevent XSS
 */
const escapeHtml = (str) => {
  if (typeof str !== 'string') return str;
  
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  
  return str.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
};

/**
 * Removes HTML tags from string
 */
const stripHtmlTags = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>/g, '');
};

/**
 * Prevents NoSQL injection by removing MongoDB operators
 */
const preventNoSqlInjection = (obj) => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'object' && !Array.isArray(obj)) {
    const sanitized = {};
    const dangerousKeys = ['$where', '$ne', '$gt', '$gte', '$lt', '$lte', '$in', '$nin', '$regex', '$exists', '$elemMatch', '$size', '$type', '$mod', '$text', '$geoWithin', '$geoIntersects', '$near', '$nearSphere'];
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Check if key starts with $ (MongoDB operator) - prevent NoSQL injection
        if (key.startsWith('$') || dangerousKeys.includes(key)) {
          continue; // Skip dangerous keys
        }
        sanitized[key] = preventNoSqlInjection(obj[key]);
      }
    }
    return sanitized;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => preventNoSqlInjection(item));
  }

  return obj;
};

/**
 * Recursively sanitizes an object's string values
 */
const sanitizeObject = (obj) => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    // Strip HTML tags and escape special characters to prevent XSS
    let sanitized = stripHtmlTags(obj);
    sanitized = escapeHtml(sanitized);
    // Trim whitespace
    return sanitized.trim();
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (typeof obj === 'object') {
    const sanitized = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Skip password fields from HTML sanitization (they're hashed anyway)
        // But still protect against NoSQL injection
        if (key === 'password' || key === 'adminPassword') {
          sanitized[key] = obj[key];
        } else {
          sanitized[key] = sanitizeObject(obj[key]);
        }
      }
    }
    return sanitized;
  }

  return obj;
};

/**
 * Main middleware to sanitize all inputs
 */
export const sanitizeInput = (req, res, next) => {
  try {
    // Sanitize request body (prevent NoSQL injection first, then XSS)
    if (req.body && typeof req.body === 'object') {
      req.body = preventNoSqlInjection(req.body);
      req.body = sanitizeObject(req.body);
    }

    // Sanitize request query parameters
    if (req.query && typeof req.query === 'object') {
      req.query = preventNoSqlInjection(req.query);
      req.query = sanitizeObject(req.query);
    }

    // Sanitize request parameters (URL params)
    if (req.params && typeof req.params === 'object') {
      req.params = preventNoSqlInjection(req.params);
      req.params = sanitizeObject(req.params);
    }

    next();
  } catch (error) {
    console.error('Error in sanitization middleware:', error);
    return res.status(400).json({ message: 'Invalid input data' });
  }
};

export default sanitizeInput;

