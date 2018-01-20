function cleanse(textData){
    // todo: clean out URLs, \r\ns, markup etc
    return textData
        .replace(/\s+/gm, ' ')
        .replace(/(\r\n|\n|\r)+/gm, ' ');
}

function test() {
    var testData = "A\t\t\t\t\t\t\t\t\t\t\t\r\r\n\r\t\t\t\t\t\t\tB";
    var result = cleanse(testData);
    console.log(result);
}

test();