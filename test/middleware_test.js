const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let joe, blogPost;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is great', content: 'Yes it really is' });
        
        // this only pushes a reference to the ObjectId due to the User schema setup
        // this is how we setup associations
        // joe has many blogPosts, has many relationship
        joe.blogPosts.push(blogPost); 
        // used commonly when setting up associations like this
        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());
    });

    it('users clean up dangling blogposts on remove', (done) => {
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            })
            .catch(err => {
                console.log(err);
            })
    });
});
