const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session config
app.use(session({
    store: new pgSession({
        conString: process.env.DATABASE_URL,
    }),
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});
const scheduleRoutes = require('./routes/scheduleRoutes');
app.use(scheduleRoutes);

// Подключение к БД и моделям
const sequelize = require('./config/db');
require('./models/User');
require('./models/Group');
require('./models/Student');
require('./models/Teacher');
require('./models/Subject');
require('./models/Schedule');

// Синхронизация и запуск сервера
sequelize.sync({ alter: true })
    .then(() => {
        console.log('DB synced');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('DB connection error:', err);
    });
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);
