/**
 * Checks if the user is logged in to be able to access the path or site.
 * 
 * @param {*} req The request object.
 * @param {*} res The response object.
 * @param {*} next The next middleware function.
 * @returns Sends the user to the path if authorized.
 */
export const checkAuth = (req, res, next) => {
    if (res.locals.user) {
        return next()
    } else {
        return res.status(401).json({ 
          message: 'You have to be logged in to access this resource' 
        })
    }
}