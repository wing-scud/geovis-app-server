
module.exports = function useRoutes(app, io) {
    app.use("/weather", require('./weather'));
    app.use("/user", require('./user'));
    app.use("/conserve", require('./conserve'))
    app.use("/stateShare", require('./stateShare')(io))
}