import { getURLsFromHTML } from "./crawl.js";

console.log("Launching...");

const sampleHTML = `
<html>
    <body>
        <a href="https://example.com/page1">Page 1</a>
        <a href="https://example.com/page2">Page 2</a>
        <a href="/relative-link">Relative Link</a>
    </body>
</html>
`;
getURLsFromHTML(sampleHTML,'https://example.com');