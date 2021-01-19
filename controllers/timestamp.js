exports.processDate = (req, res, next) => {
  const timestamp = req.params.date;
  let fecha = new Date(timestamp);

  if (fecha.getTime() > 0) {
    // si la fecha tiene el formato normal
    res.status(200).json({
      unix: fecha.getTime(),
      utc: fecha.toUTCString(),
    });
  } else {
    fecha = new Date(Number(timestamp));
    if (fecha.getTime() > 0) {
      // fecha con formato unix
      res.status(200).json({
        unix: fecha.getTime(),
        utc: fecha.toUTCString(),
      });
    } else {
      res.status(200).json({ error: 'Invalid Date' });
    }
  }
};

exports.noDate = (req, res, next) => {
  const fecha = new Date(Date.now());
  res.status(200).json({
    unix: fecha.getTime(),
    utc: fecha.toUTCString(),
  });
};
