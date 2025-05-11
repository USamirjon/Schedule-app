const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.showLogin = (req, res) => {
    res.render('login');
};

exports.showRegister = (req, res) => {
    res.render('register');
};

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
        await User.create({ username, password: hash, role });
        res.redirect('/login');
    } catch (err) {
        res.send('Ошибка при регистрации: ' + err.message);
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.send('Пользователь не найден');

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.send('Неверный пароль');

        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role
        };
        res.redirect('/');
    } catch (err) {
        res.send('Ошибка при входе: ' + err.message);
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
