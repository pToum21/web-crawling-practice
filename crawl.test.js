const { noramlizeUrl, getUrlsFromHTML } = require('./crawl');
const { test, expect } = require('@jest/globals');
const exp = require('constants');

// test to strip the protocol
test('noramlizeUrl strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = noramlizeUrl(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
});

// test to strip the trailing slash
test('noramlizeUrl strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = noramlizeUrl(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
});

// test to omit capital letters
test('noramlizeUrl capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = noramlizeUrl(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
});

// test to strip the http or https
test('noramlizeUrl strip http', () => {
    const input = 'http://BLOG.boot.dev/path/'
    const actual = noramlizeUrl(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
});

test('getUrlsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
});

test('getUrlsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
});