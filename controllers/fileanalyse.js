exports.getInfo = (req, res, next) => {
  console.log(req.file);
  res.status(200).json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
};
