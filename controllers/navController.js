const userdb = require('../models/User')
const announcementdb = require('../models/Announcement')

const navController = {

    async home (req, res) { // ACCESS TO ALL
        try {
            if(req.session.user.id == null){ 
                res.redirect('/login');
            }else{
                const announcement = await announcementdb.find({acknowledgeby: { $nin: [req.session.user.id] }});
                res.render('index', { data: req.session.user, allannouncemnet: announcement }) 
            }
        } catch (e) {
            res.redirect('/login') 
        }
    },
    home_redirect (req, res) { // ACCESS TO ALL
        res.redirect('/home')
    },
    login (req, res) { // ACCESS TO ALL
        try {
            if(req.session.user.id == null){ 
                res.render('login') 
            }else{
                res.redirect('/index') 
            }
        } catch (e) {
            res.render('login') 
        }
    },
    dashboard (req, res) { // ACCESS TO ALL
        try {
            if(req.session.user.id == null){ 
                res.redirect('/login');
            }else{
                res.render('dashboard', { data: req.session.user })
            }
        } catch (e) {
            res.redirect('/login') 
        }
    },
    account (req, res) { // ACCESS TO ALL
        try {
            if(req.session.user.id == null){ 
                res.redirect('/login');
            }else{
                res.render('account', { data: req.session.user })
            }
        } catch (e) {
            res.redirect('/login') 
        }
    },
    async employeemanager(req, res) { // ACCESS TO SUPERUSER AND ADMIN 
        try {
            if(req.session.user.id == null){ 
                res.redirect('/login');
            }else{
                if(req.session.user.superuser || req.session.user.admin){
                    const users = await userdb.find();
                    res.render('employee-manager', { data: req.session.user, alluser: users })
                }else{
                    res.render('404')
                }
            }
        } catch (e) {
            res.redirect('/login') 
        }
    },
    devGeneral(req, res) { // ACCESS TO SUPERUSER AND DEVELOPER
        try {
            if(req.session.user.id == null){ 
                res.redirect('/login');
            }else{
                if(req.session.user.developer){
                    res.render('admin', { data: req.session.user })
                }else{
                    res.render('404')
                }
            }
        } catch (e) {
            res.redirect('/login') 
        }
    },
    devConsole(req, res) { // ACCESS TO SUPERUSER AND DEVELOPER
        try {
            if(req.session.user.id == null){ 
                res.redirect('/login');
            }else{
                if(req.session.user.developer){
                    res.render('console', { data: req.session.user })
                }else{
                    res.render('404')
                }
            }
        } catch (e) {
            res.redirect('/login') 
        }
    }

}

module.exports = Object.keys(navController).reduce((exports, functionName) => {
    exports[functionName] = navController[functionName];
    return exports;
}, {});