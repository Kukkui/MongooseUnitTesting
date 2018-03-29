const assert = require('assert');
const User = require('../src/user');

describe('creating records', () => {
  it('saves a user', (done) => {

    const joe = new User({
        name: 'joe'
    });

    joe.save()
      .then(() => {
        console.log('joe is new', joe.isNew);
        // double check isNew
        assert(!joe.isNew);
        done();
      });
  });
});