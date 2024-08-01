import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test('normalising URL removes protocol and any trailing slash', () => {
expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
expect(normalizeURL('http://example.com/')).toBe('example.com');
expect(normalizeURL('http://example.com')).toBe('example.com');
});