import jwt from 'jsonwebtoken';
import { Responder } from '../lib';

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) return Responder.operationFailed(res, { auth: false, error: 'No token provided', status: 403 });
  // need to convert this to promise
  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    if (err) return Responder.operationFailed(res, { auth: false, error: 'Failed to authenticate token', status: 500 });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    return next();
  });
};

export default verifyToken;
