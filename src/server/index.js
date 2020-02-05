require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();
app.use(helmet());

// Serve static contents
app.use(express.static(path.join(`${__dirname}../../../dist`)));
app.use(cors());
app.use(express.json());

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Import Routes
app.use('/api/user', require('./routes/AuthRoute'));
app.use('/api/profile', require('./routes/ProfileRoute'));

// Connect from the DB helper
mongoose.connect(
  process.env.MONGO_KEY, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    ssl: true,
    dbName: process.env.DB_NAME
  }
);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}../../../dist/index.html`));
});
// Handles any requests that don't match the ones above
app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}../../../dist/index.html`));
});

// Start Server
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
