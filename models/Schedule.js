const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Teacher = require('./Teacher');
const Subject = require('./Subject');
const Group = require('./Group');

const Schedule = sequelize.define('Schedule', {
    weekday: {
        type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
        allowNull: false
    },
    time: {
        type: DataTypes.STRING, // например: "08:30-10:00"
        allowNull: false
    }
});

// Связи
Teacher.hasMany(Schedule);
Schedule.belongsTo(Teacher);

Subject.hasMany(Schedule);
Schedule.belongsTo(Subject);

Group.hasMany(Schedule);
Schedule.belongsTo(Group);

module.exports = Schedule;
