import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('normalising URL removes protocol and any trailing slash', () => {
expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
expect(normalizeURL('http://example.com/')).toBe('example.com');
expect(normalizeURL('http://example.com')).toBe('example.com');
});

test('link grabs relative and absolute', () => {
const sampleHTML = `
<html>
    <body>
        <a href="https://example.com/page1">Page 1</a>
        <a href="https://example.com/page2">Page 2</a>
        <a href="/relative-link">Relative Link</a>
    </body>
</html>
`;

expect(getURLsFromHTML(sampleHTML,'https://example.com')).toEqual([
    'https://example.com/page1',
    'https://example.com/page2',
    'https://example.com/relative-link'
  ]);
});