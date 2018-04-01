const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('dfsfds', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is great', content: 'Yes it really is' });
        comment = new Comment({ content: 'Congrats on great post' });

        // this only pushes a reference to the ObjectId due to the User schema setup
        // this is how we setup associations
        // joe has many blogPosts, has many relationship
        joe.blogPosts.push(blogPost);
        // a blogpost has many comments, has many one relationship
        blogPost.comments.push(comment);
        // a comment has one user, has one relationship
        // sets a reference to joe's ObectId
        comment.user = joe;   

        // used commonly when setting up associations like this
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it.only('saves a relation between a user and a blogpost', (done) =>{
        User.findOne({ name: 'Joe' })
            .then((user) => {
                console.log(user);
                done();
            })
    });
});