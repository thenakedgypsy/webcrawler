import { getURLsFromHTML,fetchHTML, deepCrawl } from "./crawl.js";

function main()
{
    console.log("Launching...");
    if(process.argv.length === 2)
    {
        throw new Error("No URL Given. Expected 1 argument: URL");
    }
    else if(process.argv.length > 3)
    {
        throw new Error("Too Many Arguments Given, Expected 1 argument: URL");
    }
    console.log(`Base URL Accepted: ${process.argv[2]}`);
    deepCrawl(process.argv[2]);


}

main();


