
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const corsMiddleware = require('./middleware/corsMiddleware'); 
const upload = require('./middleware/fileUploadMiddleware');    
const candidateRoutes = require('./routes/candidateRoutes');


dotenv.config();

// Create an instance of Express app
const app = express();

// Middleware setup
app.use(corsMiddleware);           
app.use(express.json());            

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes setup
app.use('/api/candidates', candidateRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
