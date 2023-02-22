const mongoose = require('mongoose');
const Schema = require('./MongoConnection')

const announceSchema = new Schema({
    id: { type: String, unique: true, required: true }, 
    date: { type: String, required: true }, 
    user_id: { type: String, required: true }, 
    title: { type: String, required: true }, 
    content: { type: String, required: true }, 
    acknowledgeby: { type: [String], required: true }, 
});

const Announcement = mongoose.model('announcement', announceSchema);

module.exports = Announcement