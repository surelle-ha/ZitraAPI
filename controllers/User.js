const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generator = require('../middleware/generateID')
const checkXSS = require('../middleware/xssBlock')

const userdb = require('../models/User')

const userController = { 
  
  test (req, res) {
    res.send({ 
      code: '200', 
      result: 'success', 
      return: true, 
      message: 'User V1 API is working', 
      time: new Date().toLocaleString() 
    });
  },
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
    res.send({ 
      code: '200', 
      result: 'success', 
      return: true, 
      text: 'Created new user and JWT created', 
      token: token,
      time: new Date().toLocaleString() 
    });
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
            res.send({ 
              code: '200', 
              result: 'success', 
              return: true, 
              text: 'JWT matched and user registered', 
              time: new Date().toLocaleString() 
            })
          })
          .catch((err) => { 
            console.log('[ WRNG ] ' + err),
            res.send({ 
              code: '401', 
              result: 'failed', 
              return: false, 
              text: 'Error Registration', 
              error: err,
              time: new Date().toLocaleString() 
            })
          });
      } else {
        return console.log('[ WRNG ] ' + error),
        res.send({ 
          code: '401', 
          result: 'failed', 
          return: false, 
          text: 'Error Registration', 
          error: error,
          time: new Date().toLocaleString() 
        });
      }
    } catch (error) {
      return console.log('[ WRNG ] ' + error),
      res.send({ 
        code: '401', 
        result: 'failed', 
        return: false, 
        text: 'Error Registration', 
        error: err,
        time: new Date().toLocaleString() 
      })
    }
  },
  AuthUser(req, res) {
    userdb.findOne({ email: req.body.email, pass: crypto.createHash('sha3-512').update(process.env.SECURITY_SALT + req.body.pass).digest('hex') }, function (err, user) {
      if (err) { 
        console.log('[ WRNG ] ' + err),
        res.send({ 
          code: '500', 
          result: 'failed', 
          return: false, 
          message: 'Internal Error. Something went wrong', 
          error: err,
          time: new Date().toLocaleString() 
        })
      } else if (user) { 
        req.session.user = user;
        res.send({ 
          code: '200', 
          result: 'success', 
          return: true, 
          message: 'Credential Matched. User Details saved to session', 
          time: new Date().toLocaleString() 
        })
      } else { 
        res.send({ 
          code: '401', 
          result: 'failed', 
          return: false, 
          message: 'Invalid email or password. Try again', 
          time: new Date().toLocaleString() 
        })
      }
    });
  },
  LogoutUser(req, res) {
      req.session.destroy();
      res.send({ 
        code: '200', 
        result: 'success', 
        return: true, 
        message: 'Successfully destroyed user session', 
        time: new Date().toLocaleString() 
      })
  }

}

module.exports = Object.keys(userController).reduce((exports, functionName) => {
    exports[functionName] = userController[functionName];
    return exports;
}, {});