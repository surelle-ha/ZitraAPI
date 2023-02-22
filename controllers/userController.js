const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generator = require('../service/genService')
const checkXSS = require('../service/xssService')

const userdb = require('../models/User')

const userController = { 
  
  CreateUser(req, res) { // CAN ONLY BE USE BY ADMIN {IMPROVE API SECURITY}
    let data = {
      id: generator.userID(15, '1234567890abcdefghijklmnopqrstuvwxyz'),
      fname: checkXSS(req.query.fname),
      mname: checkXSS(req.query.mname),
      lname: checkXSS(req.query.lname),
      gender: checkXSS(req.query.gender),
      birth: checkXSS(req.query.birth),
      address_1: checkXSS(req.query.address_1),
      address_2: checkXSS(req.query.address_2),
      city: checkXSS(req.query.city),
      state: checkXSS(req.query.state),
      postcode: checkXSS(req.query.postcode),
      country: checkXSS(req.query.country),
      email: checkXSS(req.query.email),
      pass: checkXSS(crypto.createHash('sha3-512').update(process.env.SECURITY_SALT + req.query.pass).digest('hex')),
      position: checkXSS(req.query.position),
      executive: checkXSS(req.query.executive),
      admin: checkXSS(req.query.admin),
      finance: checkXSS(req.query.finance),
      humanresource: checkXSS(req.query.humanresource),
      developer: checkXSS(req.query.developer),
      superuser: checkXSS(req.query.superuser),
      reportto: checkXSS('--'),
      hiredate: checkXSS(req.query.hiredate),
      display_image: checkXSS(req.query.display_image),
      status: checkXSS(req.query.status),
    }
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
    console.log('[ INFO ] Created new user and JWT created.')
    /*
      ADD EMAIL FUNCTION / JWT will be sent to user email address
    */
    res.send(token);
  },
  AddUser(req, res) { // CAN ONLY BE USE BY ADMIN {IMPROVE API SECURITY}
    try {
      const token = req.query.reg_id;
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (verified) {
        const newUser = new userdb(verified);
        newUser.save()
          .then(() => {
            console.log('[ INFO ] JWT matched and user registered.')
            res.send(verified)
          })
          .catch((err) => { res.render('500'), console.log('[ WRNG ] ' + err) });
      } else {
        return res.status(401).send(error);
      }
    } catch (error) {
      return res.status(401).send(error);
    }
  },
  AuthUser(req, res) {
    userdb.findOne({ email: req.body.email, pass: crypto.createHash('sha3-512').update(process.env.SECURITY_SALT + req.body.pass).digest('hex') }, function (err, user) {
      if (err) { 
        res.redirect('/login?error=500') // { message: 'Internal Error. Something went wrong.' }
      } else if (user) { 
        req.session.user = user;
        res.redirect('/home') 
      } else { 
        res.redirect('/login?error=401') // { message: 'Invalid email or password. Try again.' }
      }
    });
  },
  LogoutUser(req, res) {
      req.session.destroy();
      res.redirect('/login');
  }

}

module.exports = Object.keys(userController).reduce((exports, functionName) => {
    exports[functionName] = userController[functionName];
    return exports;
}, {});