/*
    API Endpoint access for all employee above regular status. 
*/
const generator = require('../service/genService')
const checkXSS = require('../service/xssService')
const urlDesign = require('../service/urldesignService')

const AnnouncementTB = require('../models/Announcement')

const announcementController = {

    test(req, res) { /* GET /core/test */
        res.send('nonregular API is working')
    },
    addAnnouncement(req, res) { /* GET /core/addAnnouncement -- make it POST REQUEST */
        let data = {
            id: generator.userID(10, '1234567890abcdefghijklmnopqrstuvwxyz'), 
            date: new Date().toLocaleString(), 
            user_id: req.session.user.id, 
            title: checkXSS(req.body.title), 
            content: urlDesign(checkXSS(req.body.content)),
            acknowledgeby: []
        }
        const addannounce = new AnnouncementTB(data);
        addannounce.save()
        .then(() => {
            console.log('[ INFO ] Added to Announcement.')
            res.redirect('/home')
        })
        .catch((err) => { res.render('500'), console.log('[ WRNG ] ' + err) });
    },
    removeAnnouncement(req, res) {
        AnnouncementTB.deleteOne({ id: req.query.id })
        .then(result => {
            console.log('[ INFO ] Removed Announcement - ID: ' + req.query.id)
            res.redirect('/announcement')
        })
        .catch((err) => { res.render('500'), console.log('[ WRNG ] ' + err) });
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

module.exports = Object.keys(announcementController).reduce((exports, functionName) => {
    exports[functionName] = announcementController[functionName];
    return exports;
}, {});
