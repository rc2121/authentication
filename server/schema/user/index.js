const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    gender: {
        type: Boolean,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    super_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'SuperUser'
    }
},{
    collection: 'User',
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);