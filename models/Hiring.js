const mongoose = require('mongoose');
const Schema = require('./MongoConnection')

const hiringSchema = new Schema({
    id: { type: String, unique: true, required: true }, 
    name: { type: String, required: true }, 
    position: { type: String, required: true }, 
    validity: { type: String, required: true },
    link: { type: String, required: true }
});

const Hiring = mongoose.model('hiring', hiringSchema);

module.exports = Hiring