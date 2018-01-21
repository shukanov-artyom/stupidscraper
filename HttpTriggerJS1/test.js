function cleanse(textData){
    // todo: clean out URLs, \r\ns, markup etc
    return textData
        .replace(/\s+/gm, ' ') // replace multiple space characters with one space
        .replace(/(\r\n|\n|\r)+/gm, ' ') // remove carriage retrun / newline
        .replace(/(<\S+>\S*<\/\S+>)+/gm, ' ') // remove html tags included in text
        .replace(/function\s\S+{.*}/, ' '); // remove javascript functions
}

function test() {
    var testData = "A\t\t\t\t\t\t\t\t\t\t<div>pepe</div>\t\r\r\n\r\t\t\t\t\t\t\tB";
    var result = cleanse(testData);
    console.log(result);
}

test();