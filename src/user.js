const mongoose = require('mongoose');
const PostSchema = require('./post');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.']
    },
    posts: [PostSchema],
    likes: Number,
    // a user can have an array of blogposts
    // ref setup
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

// virtual properties example
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

//mongoose middleware 
UserSchema.pre('remove', function(next) {
  // this === user instance 'aka joe'
  // BlogPost here is referenced in order to avoid cyclic requires
  const BlogPost = mongoose.model('blogPost');

  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;