const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Group = require('./Group');

const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Group.hasMany(Student);
Student.belongsTo(Group);

module.exports = Student;
