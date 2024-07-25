const noramlizeUrl = require('./crawl').noramlizeUrl;
const { test, expect } = require('@jest/globals');
const exp = require('constants');

test('noramlizeUrl', () => {
    const input = ''
    const actual = noramlizeUrl(input);
    const expected = ''
    expect(actual).toEqual(expected);
});