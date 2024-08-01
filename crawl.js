function normalizeURL(urlString)
{
    const urlObj = new URL(urlString);
    let newURL = `${urlObj.hostname}${urlObj.pathname}`;
    if(newURL[newURL.length - 1] === '/')
    {
        newURL = newURL.slice(0,-1);
    }
    return newURL;
}