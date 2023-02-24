const jwt = require('jsonwebtoken');

const generator = require('../service/genService')
const checkXSS = require('../service/xssService')
const urlDesign = require('../service/urldesignService')

const HiringDB = require('../models/Hiring')

const hrController = {

    test(req, res) {
        res.send('HR API is working')
    },
    createHiring (req, res) {
        let data = {
            id: generator.userID(10, '1234567890abcdefghijklmnopqrstuvwxyz'), 
            name: checkXSS(req.query.appname),
            position: req.query.apppos, 
            validity: req.query.appdate
        }
        let token = jwt.sign(data, process.env.JWT_SECRET_KEY);
        data.link = 'https://zitracore.onrender.com/application/' + token;
        const hiring = new HiringDB(data);
        hiring.save()
        .then(() => {
            console.log('[ INFO ] Added to HiringDB.')
            console.log('[ INFO ] Created hiring details saved and JWT created.')
            res.send(token);
        })
        .catch((err) => { res.send("error"), console.log('[ WRNG ] ' + err) });
    },

    removeHiring(req, res) {
        HiringDB.deleteOne({ id: req.query.id })
        .then(result => {
            console.log('[ INFO ] Removed Hiring - ID: ' + req.query.id)
            res.redirect('/hiring-portal')
        })
        .catch((err) => { res.render('500'), console.log('[ WRNG ] ' + err) });
    },

}

module.exports = Object.keys(hrController).reduce((exports, functionName) => {
    exports[functionName] = hrController[functionName];
    return exports;
}, {});
