const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    user: {
        // sets a reference tp userid
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;