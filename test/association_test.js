const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
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

    it('saves a relation between a user and a blogpost', (done) =>{
        User.findOne({ name: 'Joe' })
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === "JS is great");
                done();
            })
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === "Joe");
                assert (user.blogPosts[0].title === "JS is great");
                assert(user.blogPosts[0].comments[0].content === "Congrats on great post");
                assert(user.blogPosts[0].comments[0].user.name === "Joe");
                done();
            })
    })
});