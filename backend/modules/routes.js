const authRouter = require('./auth/routes');
const eventRouter = require('./event/routes');
const uploadRouter = require('./upload/routes');
const userProfileRouter = require('./user-profile/routes');
const registrationRouter = require('./registration/routes');
const newsletterRouter = require('./newsletter/routes');
const teamRouter = require('./team/routes');

module.exports = function(app) {
    app.get('/api', (req, res) => {
        res.status(200).json({
            message: 'Hello!'
        });
    });
    app.use('/api/auth', authRouter);
    app.use('/api/upload', uploadRouter);
    app.use('/api/newsletter', newsletterRouter);

    /** Model related routes */
    app.use('/api/events', eventRouter);
    app.use('/api/teams', teamRouter);
    app.use('/api/user-profiles', userProfileRouter);
    app.use('/api/registrations', registrationRouter);
};
