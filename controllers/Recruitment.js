const jwt = require('jsonwebtoken');
const HiringDB = require('../models/Hiring');
const generator = require('../middleware/generateID');
const checkXSS = require('../middleware/xssBlock');

const hrController = {
  test(req, res) {
    // GET /api/v1/core/recruitment/test
    if (req.session.user.humanresource || req.session.user.superuser) {
      res.send({ 
        code: '200', 
        result: 'success', 
        return: true, 
        message: 'Human Resource V1 API is working', 
        time: new Date().toLocaleString() 
      });
    } else {
      res.send({ 
        code: '401', 
        result: 'failed', 
        return: false, 
        message: 'Human Resource V1 API is working', 
        time: new Date().toLocaleString() 
      });
    }
  },

  createHiring(req, res) {
    // GET /api/v1/core/recruitment/create
    if (req.session.user.humanresource || req.session.user.superuser) {
      const data = {
        id: generator.userID(10, '1234567890abcdefghijklmnopqrstuvwxyz'),
        name: checkXSS(req.query.appname),
        position: req.query.apppos,
        validity: req.query.appdate,
      };

      const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
      data.link = `https://zitracore.onrender.com/application/${token}`;

      const hiring = new HiringDB(data);
      hiring.save()
        .then(() => {
          console.log('[ INFO ] Created hiring details and JWT saved in database: ' + data.id);
          res.send({ 
            code: '200', 
            result: 'success', 
            return: true, 
            message: 'Created hiring details and JWT saved in database: ' + data.id,
            link: data.link, 
            time: new Date().toLocaleString() 
          });
        })
        .catch((err) => {
          res.send({ 
            code: '401', 
            result: 'failed', 
            return: false, 
            message: 'Internal Server Error',
            error: err, 
            time: new Date().toLocaleString() 
          });
        });
    } else {
      res.send({ 
        code: '401', 
        result: 'failed', 
        return: false, 
        message: 'Forbidden. Access Denied',
        error: err, 
        time: new Date().toLocaleString() 
      });
    }
  },

  removeHiring(req, res) {
    // GET /api/v1/core/recruitment/remove
    if (req.session.user.humanresource || req.session.user.superuser) {
      HiringDB.deleteOne({ id: req.query.id })
        .then((result) => {
          console.log(`[ INFO ] Removed Hiring: ${req.query.id}`);
          res.send({ 
            code: '200', 
            result: 'success', 
            return: true, 
            message: 'Removed Hiring: ' + req.query.id,
            time: new Date().toLocaleString() 
          });
        })
        .catch((err) => {
          res.send({ 
            code: '401', 
            result: 'failed', 
            return: false, 
            message: 'Error removing Hiring: ' + req.query.id,
            time: new Date().toLocaleString() 
          });
        });
    } else {
      res.send({ 
        code: '401', 
        result: 'failed', 
        return: false, 
        message: 'Forbidden. Access Denied',
        error: err, 
        time: new Date().toLocaleString() 
      });
    }
  },
};

module.exports = Object.keys(hrController).reduce((exports, functionName) => {
  exports[functionName] = hrController[functionName];
  return exports;
}, {});
