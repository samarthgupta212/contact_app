import { Responder } from '../lib';

const verifyAdminToken = (req, res, next) => {
  if (!req.headers.apikey) {
    return Responder.operationFailed(res, { auth: false, error: 'No Token provided', status: 403 });
  }
  if (req.headers.apikey !== process.env.adminSecret) {
    return Responder.operationFailed(res, { auth: false, error: 'Token not verified', status: 500 });
  }
  return next();
};

export default verifyAdminToken;
