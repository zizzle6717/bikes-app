const authToken = 'mock-user-auth-token';

export default (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      if (req.headers.authorization.split(' ')[1] === authToken) {
        return next();
      }

      throw new Error('JsonWebTokenError');
    }

    return res.status(401).send({
      message: "Invalid 'authorization' header provided",
      statusCode: 401,
    });
  } catch (err) {
    if (err.message === 'JsonWebTokenError') {
      return res.status(403).send({
        message: err.message,
        statusCode: 403,
      });
    }

    return res.status(403).send({
      message: err.message,
      statusCode: 500,
    });
  }
};
