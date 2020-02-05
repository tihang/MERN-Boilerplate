const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserValidation = require('../helpers/UserValidation');

router.post('/register', async (req, res) => {
  // Validating data using our helper-UserValidation
  // Destructuring error from ValidationResult
  const { error } = UserValidation.registerValidation(req.body);
  // Returns error object if there is validation error, else returns null

  if (error) return res.status(400).send({ message: error.details[0].message });

  // Check if user is existing user
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send({ message: 'Email already exists' });

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const newUser = await user.save();
    return res.status(201).send({ message: 'User Created', user: newUser.id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  // Validating login data our helper-UserValidation
  // Destructuring error from ValidationResult
  const { error } = UserValidation.loginValidataion(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  // Checking if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ message: 'Email not found' });

  // Check if password is correct
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).send({ message: 'Invalid password' });

  // Create and assign token
  const token = jwt.sign({ user: user.id }, process.env.JWT_TOKEN_SECRET);

  return res
    .header('auth-token', token)
    .status(200)
    .send({ token, email: user.email, avatar: user.avatar });
});

module.exports = router;
