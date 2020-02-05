// Profile Route
const router = require('express').Router();
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const AvatarUploader = require('../middleware/AvatarUploader');
const MONGOOSE_CONNECT = require('../helpers/DBConnection');
const User = require('../models/User');
const auth = require('../middleware/VerifyToken');

// Initialize stream
let gfs;
MONGOOSE_CONNECT.once('open', () => {
  gfs = Grid(MONGOOSE_CONNECT.db, mongoose.mongo);
});

// @ROUTE /api/profile/avatar/create
// @DESC Endpoint for User Avatar Upload & Require authcheck middleware
router.post('/avatar/create', auth, AvatarUploader.single('file'), async (req, res) => {
  // Update the logged in user
  try {
    // Assign new avatar to the user
    const updatedUser = await User.findByIdAndUpdate(req.user.user,
      { avatar: req.file.filename }, { new: true });

    return res.status(200).json({ avatar: updatedUser.avatar });
  } catch (error) {
    return res.status(400).json(error);
  }
});


// @ROUTE /api/profile/avatar/index
// @DESC Returns JSON object details of all uploaded avatars
router.get('/avatar/index', (req, res) => {
  gfs.collection('Avatar').find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exists'
      });
    }
    return res.json(files);
  });
});

// @ROUTE /api/profile/avatar/show/:id
// @DESC Returns JSON object detail of a single avatar
router.get('/avatar/show/:id', (req, res) => {
  gfs.collection('Avatar').findOne({ filename: req.params.id }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Readstream to the browser
      const readstream = gfs.createReadStream(file.filename);
      return readstream.pipe(res);
    }
    return res.status(404).json({ error: 'Not an image' });
  });
});

// @ROUTE /api/profile/avatar/show/:id
// @DESC Returns JSON object detail of a single avatar
router.delete('/avatar/destroy/:id', (req, res) => {
  gfs.collection('Avatar').remove({ id: req.params.id, root: 'Avatar' }, (err) => {
    if (err) {
      return res.json({ error: 'Unable to delete.' });
    }
    return res.json({ sucess: 'Successfully deleted' });
  });
});

module.exports = router;
