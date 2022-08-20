const { equals } = require("../strings/equals");

const contentTypeChecker = (req) =>  {
    const contentType = req.headers['content-type'];
    if(!contentType) return false;

    return equals(contentType, 'application/json') || equals(contentType, "application/jwt");
}

module.exports.contentTypeChecker = contentTypeChecker;