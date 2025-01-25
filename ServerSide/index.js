const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const sequelize = require('./db');
const User = require('./models/UserModel');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOADS_DIR)));

// Initialize the database and sync models
sequelize.sync({ alter: true }) // Automatically create/alter tables based on models
  .then(() => console.log('Database synced'))
  .catch((error) => console.error('Error syncing database:', error));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.env.UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'));
  },
});

// Routes
app.post('/users', upload.single('profileImage'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const profileImage = req.file ? req.file.filename : '';
    const user = await User.create({ name, email, phone, profileImage });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/users/:id', upload.single('profileImage'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const profileImage = req.file ? req.file.filename : undefined;
    const updateData = { name, email, phone };
    if (profileImage) updateData.profileImage = profileImage;

    const user = await User.update(updateData, { where: { id: req.params.id } });
    if (user[0] === 0) return res.status(404).json({ error: 'User not found' });

    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' }); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`)
);
