const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('requires a user name', () => {
        const user = new User({name: undefined, postCount: 0});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === "Name is required.");
    });

    it('requires a user name longer than 2 characters', () => {
        const user = new User({ name: 'al'});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === "Name must be longer than 2 characters.");
    });

    it('disallows invalid records from being saved', (done) => {
      const user = new User({ name: 'al' });
      user.save()
        .catch((validationResult) => {
            const { message } = validationResult.errors.name;
            assert(message === "Name must be longer than 2 characters.");
            done();
        });  
    })
});