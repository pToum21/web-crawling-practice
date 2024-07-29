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

// a test that pulls out multiple urls
test('getUrlsFromHTML both a realtive and absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog path one
            </a>
            <a href="/path2/">
                Boot.dev Blog path two
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected);
});

// bad url test
test('getUrlsFromHTML Invalid URL', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = [];
    expect(actual).toEqual(expected);
});