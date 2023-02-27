require('dotenv').config()
const express = require('express')
const sessions = require('express-session')
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const uuid = require('node-uuid')
const cors = require('cors')
const MemoryStore = require('memorystore')(sessions)

// Routes
const User = require("./routes/User") // Revised
const Recruitment = require('./routes/Recruitment')
const Announcement = require('./routes/Announcement') // Revised
const ChangeLog = require('./routes/ChangeLog')

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
app.use(sessions(sessionConfig))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({ origin: '*' }));
app.use('/api', User)
app.use('/api', Recruitment)
app.use('/api', Announcement)
app.use('/api', ChangeLog)

app.get('/*', (req, res) => {
  res.send({ message: 'Zitra API: Development Environment.' })
})

app.listen(process.env.SERVER_PORT, () => {
  console.clear()
  console.log(`[ INFO ] Zitrak V1.0.112 in Dev Environment\n[ INFO ] Server is running on port ${process.env.SERVER_PORT}`);
});
