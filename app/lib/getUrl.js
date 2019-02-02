const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '2337';
const querystring = require('querystring');

const getTestURL = (path, queryObj) => {
  let host = `http://${HOST}:${PORT}${path || ''}`;

  if (queryObj && typeof queryObj === typeof null) { host += `?${querystring.stringify(queryObj)}`; }

  return host;
};

export default getTestURL;
