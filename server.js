require('dotenv').config()
const express = require('express')
const sessions = require('express-session')
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const uuid = require('node-uuid')
const MemoryStore = require('memorystore')(sessions)

// Routes
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require('./routes/adminRoutes')
const navRoutes = require('./routes/navRoutes')
const nonregularRoutes = require('./routes/nonregularRoutes')
const regularRoutes = require('./routes/regularRoutes')

const oneDay = 1000 * 60 * 60 * 24;
const sessionConfig = {
    genid: function(req){ return uuid.v1(); },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({ checkPeriod: 86400000 }),
    cookie: { maxAge: oneDay, httpOnly: true, secure: false }
}

const app = express()
app.set('view engine', 'ejs')
app.set('trust proxy', true)
app.engine('ejs', require('ejs').__express);
app.use(express.static(__dirname + process.env.WEB_DEFAULT_PATH, { index: process.env.WEB_DEFAULT_HOME }))
app.use(sessions(sessionConfig))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/', navRoutes)
app.use('/account', userRoutes)
app.use('/admin', adminRoutes)

app.use('/core', nonregularRoutes)
app.use('/core', regularRoutes)

app.get('/*', (req, res) => {
  res.render('404')
})

app.listen(process.env.SERVER_PORT, () => {
  console.clear()
  console.log(`[ INFO ] Zitrak V1.0.112 in Dev Environment\n[ INFO ] Server is running on port ${process.env.SERVER_PORT}`);
});
