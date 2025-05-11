const express = require('express');
const router = express.Router();
const { showSchedulePage, addSchedule } = require('../controllers/scheduleController');

// Показ страницы администратора
router.get('/admin/schedule', showSchedulePage);

// Обработка формы добавления пары
router.post('/admin/schedule', addSchedule);

module.exports = router;
