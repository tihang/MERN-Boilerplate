// Avatar Uploader Middleware
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const MulterGridfsStorage = require('multer-gridfs-storage');


// Create Storage engine
const storage = new MulterGridfsStorage({
  url: process.env.MONGO_KEY,
  file: (req, file) => new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return reject(err);
      }
      const filename = buf.toString('hex') + path.extname(file.originalname);
      const fileInfo = {
        filename,
        bucketName: 'Avatar' // Should match stream collection name
      };
      return resolve(fileInfo);
    });
  })
});

const AvatarUploader = multer({ storage });

module.exports = AvatarUploader;
