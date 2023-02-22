const adminController = {

    test(req, res) {
        res.send('Admin API is working')
    },

}

module.exports = Object.keys(adminController).reduce((exports, functionName) => {
    exports[functionName] = adminController[functionName];
    return exports;
}, {});
