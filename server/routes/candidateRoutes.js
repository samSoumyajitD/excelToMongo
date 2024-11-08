
const express = require('express');
const multer = require('multer');
const candidateController = require('../controllers/candidateController');
// File upload setup
const upload = multer({ dest: 'uploads/' }); 

const router = express.Router();


router.post('/upload', upload.single('excelFile'), candidateController.uploadCandidates);

module.exports = router;
