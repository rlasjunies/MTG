function endsWith(subjectString, searchString, position) {
    if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
}
exports.endsWith = endsWith;
;
//# sourceMappingURL=string+.js.map