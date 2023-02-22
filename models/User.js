const mongoose = require('mongoose');
const Schema = require('./MongoConnection')

const userSchema = new Schema({
    id: { type: String, unique: true, required: true }, 
    fname: { type: String, required: true }, 
    mname: { type: String, required: true }, 
    lname: { type: String, required: true }, 
    gender: { type: String, required: true }, 
    birth: { type: String, required: true }, 
    address_1: { type: String, required: true }, 
    address_2: { type: String, required: true }, 
    city: { type: String, required: true }, 
    state: { type: String, required: true }, 
    postcode: { type: String, required: true }, 
    country: { type: String, required: true }, 
    email: { type: String, unique: true, required: true },
    pass: { type: String, required: true },
    position: { type: String, required: true }, 
    // WIDGET ACCESS
    executive: { type: Boolean, required: true },
    admin: { type: Boolean, required: true },
    finance: { type: Boolean, required: true },
    humanresource: { type: Boolean, required: true },
    developer: { type: Boolean, required: true },
    superuser: { type: Boolean, required: true },
    // INTERNAL FUNCTION
    reportto: { type: String, required: true },
    hiredate: { type: String, required: true },
    display_image: { type: String, required: true },
    status: { type: Number, required: true },
});

const User = mongoose.model('employees', userSchema);

module.exports = User