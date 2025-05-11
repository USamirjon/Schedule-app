// Fix for Express configuration
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// IMPORTANT: Move these middleware configurations to the top
// before any routes are defined
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Change to true
// Remove body-parser as express has built-in middleware now

app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/', (req, res) => {
    res.render('index');
});

// DB & Models
const sequelize = require('./config/db');
require('./models/User');
require('./models/Group');
require('./models/Student');
require('./models/Teacher');
require('./models/Subject');
require('./models/Schedule');

// Routes
const scheduleRoutes = require('./routes/scheduleRoutes');
app.use(scheduleRoutes);
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log('DB synced');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('DB connection error:', err);
});