const jwt = require('jsonwebtoken');
const HiringDB = require('../models/Hiring');
const generator = require('../middleware/generateID');
const checkXSS = require('../middleware/xssBlock');

const hrController = {
  test(req, res) {
    if (req.session.user.humanresource || req.session.user.superuser) {
      res.status(200).send('HR API is working');
    } else {
      res.status(403).send('Forbidden');
    }
  },

  createHiring(req, res) {
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
          console.log('[ INFO ] Added to HiringDB.');
          console.log('[ INFO ] Created hiring details saved and JWT created.');
          res.status(200).send(token);
        })
        .catch((err) => {
          console.error(`[ERROR] ${err}`);
          res.status(500).send('Internal Server Error');
        });
    } else {
      res.status(403).send('Forbidden');
    }
  },

  removeHiring(req, res) {
    if (req.session.user.humanresource || req.session.user.superuser) {
      HiringDB.deleteOne({ id: req.query.id })
        .then((result) => {
          console.log(`[ INFO ] Removed Hiring - ID: ${req.query.id}`);
          res.redirect('/hiring-portal');
        })
        .catch((err) => {
          console.error(`[ERROR] ${err}`);
          res.status(500).render('500');
        });
    } else {
      res.status(403).send('Forbidden');
    }
  },
};

module.exports = Object.keys(hrController).reduce((exports, functionName) => {
  exports[functionName] = hrController[functionName];
  return exports;
}, {});
