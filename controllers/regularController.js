/*
    API Endpoint access for all employee above regular status. 
*/
const AnnouncementTB = require('../models/Announcement')

const regularController = {

    test(req, res) { /* GET /core/test */
        res.send('nonregular API is working')
    },
    acknowledgeAnnouncement(req, res) {
        AnnouncementTB.findOneAndUpdate({ id: req.query.id }, { $push: { acknowledgeby: req.session.user.id } }, { new: true })
        .then(updatedDocument => {
            console.log('[ INFO ] Acknowledge Announcement - ID: ' + req.query.id)
            res.redirect('/home')
        })
        .catch((err) => { res.render('500'), console.log('[ WRNG ] ' + err) });
    }

}

module.exports = Object.keys(regularController).reduce((exports, functionName) => {
    exports[functionName] = regularController[functionName];
    return exports;
}, {});
