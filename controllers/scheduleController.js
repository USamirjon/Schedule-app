const Schedule = require('../models/Schedule');
const Subject = require('../models/Subject');
const Group = require('../models/Group');
const Teacher = require('../models/Teacher');

exports.showSchedulePage = async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).send('Доступ запрещён');
    }

    const subjects = await Subject.findAll();
    const groups = await Group.findAll();
    const teachers = await Teacher.findAll();
    const schedules = await Schedule.findAll({ include: [Subject, Group, Teacher] });

    res.render('admin_schedule', { subjects, groups, teachers, schedules });
};

exports.addSchedule = async (req, res) => {
    const { subjectId, groupId, teacherId, weekday, time } = req.body;

    try {
        await Schedule.create({ subjectId, groupId, teacherId, weekday, time });
        res.redirect('/admin/schedule');
    } catch (err) {
        res.status(500).send('Ошибка при добавлении расписания: ' + err.message);
    }
};
