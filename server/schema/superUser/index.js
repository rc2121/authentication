const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SuperUserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
},{
    collection: 'SuperUser',
    timestamps: true
});

module.exports = mongoose.model('SuperUser', SuperUserSchema);