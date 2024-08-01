import { JSDOM } from 'jsdom';


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

function getURLsFromHTML(htmlBody, baseURL)
{
    const htmlObj = new JSDOM(htmlBody);
    let objList = htmlObj.window.document.querySelectorAll('a');
    const objArray = Array.from(objList);
    let linkArray = [];
    for(let obj of objArray)
    {
        let link = obj.getAttribute('href');
        let absoluteLink = new URL(link,baseURL).href;
        linkArray.push(absoluteLink);
    }
    return linkArray;
}

export { normalizeURL };
export { getURLsFromHTML };