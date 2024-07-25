const noramlizeUrl = require('./crawl').noramlizeUrl;
const { test, expect } = require('@jest/globals');
const exp = require('constants');

test('noramlizeUrl', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = noramlizeUrl(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
});

test('noramlizeUrl', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = noramlizeUrl(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
});