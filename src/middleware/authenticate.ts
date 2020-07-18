// import * as jwt from 'jsonwebtoken';

const authToken = process.env.MOCK_JWT;

export default (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      // If we were using an actual JWT, verify it against the JWT secret
      // jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET || '');
      if (req.headers.authorization.split(' ')[1] === authToken) {
        return next();
      }

      throw new Error('JsonWebTokenError');
    }

    return res.status(401).send({
      message: 'Invalid authorization header provided',
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
