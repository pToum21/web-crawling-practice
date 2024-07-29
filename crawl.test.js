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

// absoulte url test
test('getUrlsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://blog.boot.dev/path/';
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

// create a url that doesnt include the protocol or the domain// it only inclubdes the path
test('getUrlsFromHTML realtive', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});