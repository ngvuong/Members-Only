const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Post', postSchema);
