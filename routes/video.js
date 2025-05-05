const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/new_video', videoController.getNewVideo);
router.post('/new', videoController.postNewVideo);
router.get('/dashboard/:filter', videoController.getDashboard);

module.exports = router;
