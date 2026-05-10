/**
 * Middleware to check if a user is authenticated.
 * It looks for a user object in res.locals, which should be set 
 * by a previous session-handling middleware.
 */
export const checkAuth = (req, res, next) => {
  if (res.locals.user) {
    return next();
  }
  res.status(401).json({ 
    message: 'You must be logged in to access this resource' 
  });
};