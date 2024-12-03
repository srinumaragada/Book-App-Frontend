const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  }
});

const upload = multer({ storage });

// Endpoint to handle image upload
app.post('/upload', upload.single('coverImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Return the URL of the uploaded file
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Serve static files from 'uploads' folder
app.use('/uploads', express.static('uploads'));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
