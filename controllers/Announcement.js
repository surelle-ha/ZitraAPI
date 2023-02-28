const generator = require('../middleware/generateID');
const checkXSS = require('../middleware/xssBlock');
const urlDesign = require('../middleware/urlDesign');

const AnnouncementTB = require('../models/Announcement');

const announcementController = {
  test(req, res) {
    // POST /api/v1/core/announcement/test
    res.send({ 
      code: '200', 
      result: 'success', 
      return: true, 
      message: 'Announcement V1 API is working', 
      time: new Date().toLocaleString() 
    });
  },
  addAnnouncement(req, res) {
    // POST /api/v1/core/announcement/add
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
        console.log('[ INFO ] Added to Announcement: ' + data.id);
        res.send({ 
          code: '200', 
          result: 'success', 
          return: true, 
          message: 'Added to Announcement: ' + data.id, 
          time: new Date().toLocaleString() 
        });
      })
      .catch((err) => {
        console.log('[ WRNG ] ' + err);
        res.send({ 
          code: '401', 
          result: 'failed', 
          return: false, 
          message: 'Error adding Announcement: ' + err, 
          time: new Date().toLocaleString() 
        });
      });
  },
  removeAnnouncement(req, res) {
    // DELETE /api/v1/core/announcement/remove?id=<announcement_id>
    AnnouncementTB.deleteOne({ id: req.query.id })
      .then(result => {
        console.log('[ INFO ] Removed Announcement - ID: ' + req.query.id);
        res.send({ 
          code: '200', 
          result: 'success', 
          return: true, 
          message: 'Removed Announcement: ' + req.query.id, 
          time: new Date().toLocaleString() 
        });
      })
      .catch((err) => {
        console.log('[ WRNG ] ' + err);
        res.send({ 
          code: '401', 
          result: 'failed', 
          return: false, 
          message: 'Error removing Announcement: ' + req.query.id, 
          time: new Date().toLocaleString() 
        });
      });
  },
  acknowledgeAnnouncement(req, res) {
    // GET /api/v1/core/announcement/acknowledge?id=<announcement_id>
    AnnouncementTB.findOneAndUpdate(
      { id: req.query.id },
      { $push: { acknowledgeby: req.session.user.id } },
      { new: true }
    )
      .then(updatedDocument => {
        console.log('[ INFO ] Acknowledged Announcement: ' + req.query.id);
        res.send({ 
          code: '200', 
          result: 'success', 
          return: true, 
          message: 'Acknowledged Announcement: ' + req.query.id, 
          time: new Date().toLocaleString() 
        });
      })
      .catch((err) => {
        console.log('[ WRNG ] ' + err);
        res.send({ 
          code: '401', 
          result: 'failed', 
          return: false, 
          message: 'Error acknowledging Announcement: ' + req.query.id, 
          time: new Date().toLocaleString() 
        });
      });
  }
};

module.exports = Object.keys(announcementController).reduce((exports, functionName) => {
  exports[functionName] = announcementController[functionName];
  return exports;
}, {});
