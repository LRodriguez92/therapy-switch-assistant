/**
 * Validate request body has required fields
 */
export function validateBody(requiredFields) {
  return (req, res, next) => {
    const missing = requiredFields.filter(field => !req.body[field]);
    
    if (missing.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${missing.join(', ')}`,
        code: 'MISSING_FIELDS'
      });
    }
    
    next();
  };
}

