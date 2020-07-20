export default req => JSON.stringify(Object.assign(req.body, req.query));
