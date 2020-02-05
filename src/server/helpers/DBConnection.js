const mongoose = require('mongoose');

const MONGOOSE_CONNECT = mongoose.createConnection(
  process.env.MONGO_KEY, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    ssl: true,
    dbName: process.env.DB_NAME
  }
);
mongoose.set('useCreateIndex', true);

module.exports = MONGOOSE_CONNECT;
