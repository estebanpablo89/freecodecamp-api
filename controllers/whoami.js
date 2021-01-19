exports.info = (req, res, next) => {
  console.log(req.headers);
  res.status(200).json({
    ipaddress: req.headers.host,
    language: req.headers['accept-language'],
    software: req.headers['user-agent'],
  });
};
