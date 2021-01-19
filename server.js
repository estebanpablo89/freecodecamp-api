const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// load env vars
dotenv.config({ path: './config/config.env' });

// db
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log(
    `MongoDB Connected: ${conn.connection.host}`.cyan.underline
  );
};

connectDB();

// route file
const timestamp = require('./routes/timestamp');
const whoami = require('./routes/whoami');
const shorturl = require('./routes/shorturl');
const exercise = require('./routes/exercise');
const fileanalyse = require('./routes/fileanalyse');

// app variable
const app = express();

// Body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors header
app.use(cors());

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// mount router
app.use('/api/timestamp', timestamp);
app.use('/api/whoami', whoami);
app.use('/api/shorturl', shorturl);
app.use('/api/exercise', exercise);
app.use('/api/fileanalyse', fileanalyse);

app.get('/', (req, res) => {
  res.send('./public/index.html');
});

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .yellow
  )
);
