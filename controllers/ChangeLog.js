const generator = require('../middleware/generateID');
const checkXSS = require('../middleware/xssBlock');
const urlDesign = require('../middleware/urlDesign');

const ChangeLogTB = require('../models/ChangeLog');

const changelogController = {
  test(req, res) {
    res.send({ 
      code: '200', 
      result: 'success', 
      return: true, 
      message: 'ChangeLog V1 API is working', 
      time: new Date().toLocaleString() 
    });
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
      console.log('[ INFO ] Added to ChangeLog: ' + data.id);
      res.send({ 
        code: '200', 
        result: 'success', 
        return: true, 
        message: 'Added to ChangeLog: ' + data.id, 
        time: new Date().toLocaleString() 
      });
    })
    .catch((err) => {
      console.log('[ WRNG ] ' + err);
      res.send({ 
        code: '401', 
        result: 'failed', 
        return: false, 
        message: 'Error adding ChangeLog: ' + err, 
        time: new Date().toLocaleString() 
      });
    });
  },
  removeChangeLog(req, res) {
    // DELETE /core/removeChangeLog?id=<announcement_id>
    ChangeLogTB.deleteOne({ id: req.query.id })
    .then(result => {
      console.log('[ INFO ] Removed ChangeLog: ' + req.query.id);
      res.send({ 
        code: '200', 
        result: 'success', 
        return: true, 
        message: 'Removed ChangeLog: ' + req.query.id, 
        time: new Date().toLocaleString() 
      });
    })
    .catch((err) => {
      console.log('[ WRNG ] ' + err);
      res.send({ 
        code: '401', 
        result: 'failed', 
        return: false, 
        message: 'Error removing ChangeLog: ' + req.query.id, 
        time: new Date().toLocaleString() 
      });
    });
  }
};

module.exports = Object.keys(changelogController).reduce((exports, functionName) => {
  exports[functionName] = changelogController[functionName];
  return exports;
}, {});
