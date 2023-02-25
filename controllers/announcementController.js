const generator = require('../middleware/generateID');
const checkXSS = require('../middleware/xssBlock');
const urlDesign = require('../middleware/urlDesign');

const AnnouncementTB = require('../models/Announcement');

const announcementController = {
  test(req, res) {
    // GET /core/test
    res.send('nonregular API is working');
  },
  addAnnouncement(req, res) {
    // POST /core/addAnnouncement
    let data = {
      id: generator.userID(10, '1234567890abcdefghijklmnopqrstuvwxyz'),
      date: new Date().toLocaleString(),
      user_id: req.session.user.id,
      title: checkXSS(req.body.title),
      content: urlDesign(checkXSS(req.body.content)),
      acknowledgeby: []
    };
    const addannounce = new AnnouncementTB(data);
    addannounce.save()
      .then(() => {
        console.log('[ INFO ] Added to Announcement.');
        res.redirect('/home');
      })
      .catch((err) => {
        console.log('[ WRNG ] ' + err);
        res.render('500');
      });
  },
  removeAnnouncement(req, res) {
    // DELETE /core/removeAnnouncement?id=<announcement_id>
    AnnouncementTB.deleteOne({ id: req.query.id })
      .then(result => {
        console.log('[ INFO ] Removed Announcement - ID: ' + req.query.id);
        res.redirect('/announcement');
      })
      .catch((err) => {
        console.log('[ WRNG ] ' + err);
        res.render('500');
      });
  },
  acknowledgeAnnouncement(req, res) {
    // GET /core/acknowledgeAnnouncement?id=<announcement_id>
    AnnouncementTB.findOneAndUpdate(
      { id: req.query.id },
      { $push: { acknowledgeby: req.session.user.id } },
      { new: true }
    )
      .then(updatedDocument => {
        console.log('[ INFO ] Acknowledge Announcement - ID: ' + req.query.id);
        res.redirect('/home');
      })
      .catch((err) => {
        console.log('[ WRNG ] ' + err);
        res.render('500');
      });
  }
};

module.exports = Object.keys(announcementController).reduce((exports, functionName) => {
  exports[functionName] = announcementController[functionName];
  return exports;
}, {});
