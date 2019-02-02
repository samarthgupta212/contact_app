const pagination = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.size) || 10;
  const offset = limit * (page - 1);
  return { limit, offset };
};

export { pagination };
