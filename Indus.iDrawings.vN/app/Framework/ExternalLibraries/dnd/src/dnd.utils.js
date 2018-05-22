/**
 * Check and return true if an object is type of string
 */
function isString(obj) {
    return typeof obj === "string";
}
exports.isString = isString;
/**
 * Check and return true if an object not undefined or null
 */
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
exports.isPresent = isPresent;
/**
 * Check and return true if an object is type of Function
 */
function isFunction(obj) {
    return typeof obj === "function";
}
exports.isFunction = isFunction;
/**
 * Create Image element with specified url string
 */
function createImage(src) {
    var img = new HTMLImageElement();
    img.src = src;
    return img;
}
exports.createImage = createImage;
/**
 * Call the function
 */
function callFun(fun) {
    return fun();
}
exports.callFun = callFun;
//# sourceMappingURL=dnd.utils.js.map