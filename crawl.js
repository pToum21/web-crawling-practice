function getUrlsFromHTML(htmlBody, baseUrl) {
    const urls = [];
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
    getUrlsFromHTML
};