const download = require('download');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = function (context, req) {
    context.log('Processing URL.');
    if (req.query.url || (req.body && req.body.url)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Url " + (req.query.url || req.body.url)
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