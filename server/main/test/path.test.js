const expect = require('chai').expect;
const Path = require('path');
describe('path test', function () {
  it('get Path.dirname', function () {
    console.log(Path.resolve(__dirname, '../'));
    // console.log(Path.dirname(__filename));
    expect(1).to.be.ok;
  })
})
