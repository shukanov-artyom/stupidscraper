const download = require('download');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = function (context, req) {
    context.log('Processing URL.');
    if (req.query.url || (req.body && req.body.url)) {
        var url = req.query.url || req.body.url;
        download(url).then(data => {
            var scrapped = scrapHtml(data.toString());
        });
        context.res = {
            // status: 200, /* Defaults to 200 */
            scrappedData: scrapped 
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};

function fits(text) {
    var forbiddenWords = [ 'http' ];
    forbiddenWords.forEach(function(word) {
            if (text.indexOf(word) !== -1) {
                return false;
            }
        });
    return true;
}

function scrapHtml(html) {
    const tagsToExtract = ['p', 'h1', 'h2', 'h3'];
    var result = "";
    const dom = new JSDOM(html);
    tagsToExtract.forEach(function(tag){
        const elements = 
            dom.window.document.querySelectorAll(tag);
        for (var key in elements) {
            var text = elements[key].textContent;
            if (text && fits(text)) {
                result = result + '\r\n' + text;
            }
        }
    });
    return result;
}