const { crawlPage } = require('./crawl.js');

function main() {
    // we use three because the length of the array is 3 and the first two are the node and the file path
    if (process.argv.length < 3) {
        console.log('no website provided');
        process.exit(1);
    }
    if (process.argv.length > 3) {
        console.log('to many command line args');
        process.exit(1);
    }
    const baseeURL = process.argv[2];

    console.log(`starting to crawl website ${baseeURL}`);

    crawlPage(baseeURL);
}

main();