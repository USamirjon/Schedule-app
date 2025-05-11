const express = require('express');
const router = express.Router();

const { Schedule, Subject, Group, Teacher } = require('../models');

// GET - страница расписания
router.get('/admin/schedule', async (req, res) => {
    try {
        const subjects = await Subject.findAll();
        const groups = await Group.findAll();
        const teachers = await Teacher.findAll();
        const schedules = await Schedule.findAll({
            include: [Subject, Group, Teacher],
        });

        res.render('admin_schedule', { subjects, groups, teachers, schedules });
    } catch (err) {
        console.error('Ошибка при загрузке расписания:', err);
        res.status(500).send('Ошибка при загрузке расписания');
    }
});

// POST - добавление новой пары
router.post('/admin/schedule', async (req, res) => {
    console.log("Raw Request Body:", req.body);

    // Extract values from request body
    const { subjectId, groupId, teacherId, weekday, time } = req.body;

    console.log("Extracted Values:", {
        subjectId: subjectId,
        groupId: groupId,
        teacherId: teacherId,
        weekday: weekday,
        time: time
    });

    try {
        if (!subjectId || !groupId || !teacherId || !weekday || !time) {
            throw new Error("Missing required fields");
        }

        // Create schedule item with properly parsed values
        const newSchedule = await Schedule.create({
            subjectId: parseInt(subjectId),
            groupId: parseInt(groupId),
            teacherId: parseInt(teacherId),
            weekday: weekday,
            time: time
        });

        console.log("Created new schedule:", newSchedule.toJSON());
        res.redirect('/admin/schedule');
    } catch (error) {
        console.error('Ошибка при добавлении пары:', error);
        res.status(500).send('Ошибка при добавлении пары: ' + error.message);
    }
});

module.exports = router;