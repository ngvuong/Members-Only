const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership: {
    type: String,
    enum: ['none', 'member', 'admin'],
    default: 'none',
  },
});

module.exports = mongoose.model('User', userSchema);
