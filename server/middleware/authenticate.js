/**
 * Checks if the user is logged in to be able to access the path or site.
 * 
 * @param {*} req The request object.
 * @param {*} res The response object.
 * @param {*} next The next middleware function.
 * @returns Sends the user to the path if authorized.
 */
export const checkAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Session missing' })
  }
   req.user = { id: req.session.user.id }
   next()
}
