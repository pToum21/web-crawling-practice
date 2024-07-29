// jsdom is a library that allows you to run a browser in a node environment that allows use to use dom methods in node and dom apis in node
const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
    console.log(`Crawling in progress: ${currentURL}`);

    try {
        // fetch the page
        const resp = await fetch(currentURL);

        // check if the response is ok
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status}`);
            return;
        }

        console.log(await resp.text());
    } catch (err) {
        console.log(`Failed to fetch page: ${err.message} on page: ${currentURL}`);
    }
}

function getUrlsFromHTML(htmlBody, baseUrl) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    // this will crawl the webpage for all clickable links and return them in an array
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        console.log(linkElement.href);
        if (linkElement.href.slice(0, 1) === '/') {
            // realtive path
            try {
                const urlObj = new URL(`${baseUrl}${linkElement.href}`);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`Invalid realtive URL: ${err.message}`);
            }
        } else {
            // absolute path
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`Invalid absolute URL: ${err.message}`);
            }
        }
    }
    return urls;
}


function noramlizeUrl(urlString) {
    // beacuse the url constructor already knows that urls do not care for upper case a nd lower case the capitals test is passed without any logic to do that 
    // ^ same goes for the http or https test
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    noramlizeUrl,
    getUrlsFromHTML,
    crawlPage
};