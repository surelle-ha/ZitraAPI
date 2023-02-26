const mongoose = require('mongoose');
const Schema = require('./MongoConnection')

const changelogSchema = new Schema({
    id: { type: String, unique: true, required: true }, 
    date: { type: String, required: true }, 
    user_id: { type: String, required: true }, 
    title: { type: String, required: true }, 
    content: { type: String, required: true } 
});

const ChangeLog = mongoose.model('changelog', changelogSchema);

module.exports = ChangeLog