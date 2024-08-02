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
        if(!link)
        {
            continue;
        }
        try
        {
            let absoluteLink = new URL(link,baseURL).href; //uses link or appends to baseURL
            linkArray.push(absoluteLink);
        }
        catch(err)
        {
            console.log(`Invalid URL: ${link} -- ERR: ${err} -- baseURL: ${baseURL}`)
        }
    }
    return linkArray;
}

async function fetchHTML(url)
{
    try
    {
       const responseObj = await fetch(url);
       if(!responseObj.ok) //if not a 2xx code
       {
           throw new Error(`Bad Status: ${responseObj.status}`); //print the status
       }
       const contentType = responseObj.headers.get('Content-Type');
       if(!contentType.includes("text/html"))
       {
           throw new Error(`Unexpected Content Type: ${responseObj.headers.get('Content-Type')}`);
       }
       else
       {
           const html = await responseObj.text();
          // console.log("LOGGING HTML");
           //console.log(html);
           return html;
       }
    }
    catch(err)
    {
        console.log(`Error During Fetch: ${err}`);
        return ''; //return blank string to avoid everything exploding if fetch fails
    }
}

async function deepCrawl(baseURL, currentURL = baseURL, pages = {})
{
    let baseURLDomain = new URL(baseURL).hostname;
    let currentDomain = new URL(currentURL).hostname;

    if(baseURLDomain !== currentDomain)
    {
        return pages;
    }

    const nCurrentURL = normalizeURL(currentURL);
    if(pages[nCurrentURL])
    {
        return pages;
    }
    else
    {
        pages[nCurrentURL] = 1;
    }

    const currentHTML = await fetchHTML(currentURL);
    const currentLinks = getURLsFromHTML(currentHTML, baseURL);
    for(let link of currentLinks)
    {
        pages = await deepCrawl(baseURL,link,pages);
    }
    console.log(pages);
    return pages;
}

export { normalizeURL, getURLsFromHTML, fetchHTML, deepCrawl };