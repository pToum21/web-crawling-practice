function main() {
    // we use three because the length of the array is 3 and the first two are the node and the file path
    if (process.argv.length < 3) {
        console.log('no website provided');
        process.exit(1);
    }
    for (const arg of process.argv) {
        console.log(arg);
    }

    console.log("starting to crawl website");
}

main();