const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subject = require('./Subject');
const Group = require('./Group');
const Teacher = require('./Teacher');

const Schedule = sequelize.define('Schedule', {
    weekday: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Associations
Schedule.belongsTo(Subject, { foreignKey: 'subjectId' });
Schedule.belongsTo(Group, { foreignKey: 'groupId' });
Schedule.belongsTo(Teacher, { foreignKey: 'teacherId' });

module.exports = Schedule;
