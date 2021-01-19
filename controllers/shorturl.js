const Shorturl = require('../models/Shorturl');
const dns = require('dns');
const URL = require('url').URL;
const urlExists = require('url-exists');

exports.createUrl = async (req, res, next) => {
  try {
    urlExists(req.body.url, async (err, exists) => {
      if (!exists) {
        res.status(200).json({ error: 'invalid url' });
      } else {
        let foundUrl = await Shorturl.findOne({
          link: req.body.href,
        });

        if (foundUrl) {
          res.status(200).json({
            original_url: foundUrl.link,
            short_url: foundUrl.number,
          });
        } else {
          number = (await Shorturl.countDocuments()) + 1;
          req.body.number = number;
          req.body.link = req.body.url;

          newUrl = await Shorturl.create(req.body);

          res.status(201).json({
            original_url: newUrl.link,
            short_url: newUrl.number,
          });
        }
      }
    });
  } catch (error) {
    res.status(200).json({ error: 'invalid url' });
  }
};

exports.findUrl = async (req, res, next) => {
  try {
    const url = await Shorturl.findOne({
      number: req.params.number,
    });
    if (url) {
      res.redirect(url.link);
    } else {
      res.status(200).json({
        error: 'No short URL found for the given input',
      });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
