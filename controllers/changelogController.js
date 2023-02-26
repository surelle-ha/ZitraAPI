const generator = require('../middleware/generateID');
const checkXSS = require('../middleware/xssBlock');
const urlDesign = require('../middleware/urlDesign');

const ChangeLogTB = require('../models/ChangeLog');

const changelogController = {
  test(req, res) {
    // GET /core/test
    res.send('nonregular API is working');
  },
  addChangeLog(req, res) {
    // POST /core/addChangeLog
    let data = {
      id: generator.userID(10, '1234567890abcdefghijklmnopqrstuvwxyz'),
      date: new Date().toLocaleString(),
      user_id: req.session.user.id,
      title: checkXSS(req.body.title),
      content: urlDesign(checkXSS(req.body.content))
    };
    const addchange = new ChangeLogTB(data);
    addchange.save()
      .then(() => {
        console.log('[ INFO ] Added to Chnage Logs.');
        res.redirect('/home');
      })
      .catch((err) => {
        console.log('[ WRNG ] ' + err);
        res.render('500');
      });
  },
  removeChangeLog(req, res) {
    // DELETE /core/removeChangeLog?id=<announcement_id>
    ChangeLogTB.deleteOne({ id: req.query.id })
      .then(result => {
        console.log('[ INFO ] Removed Change Log - ID: ' + req.query.id);
        res.redirect('/home');
      })
      .catch((err) => {
        console.log('[ WRNG ] ' + err);
        res.render('500');
      });
  }
};

module.exports = Object.keys(changelogController).reduce((exports, functionName) => {
  exports[functionName] = changelogController[functionName];
  return exports;
}, {});
