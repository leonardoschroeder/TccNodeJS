module.exports = function (context, req) {
    var crypto = require("crypto")
    context.log('JavaScript HTTP trigger function processed a request.');


    var key = "supersecretkey";
    var text = "testandocriptografia";
    var encryptedText = encrypt(key, text);
    var decryptedText = decrypt(key, encryptedText);

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name) + " cript:" + encryptedText + "descript:" + decryptedText
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();

    function encrypt(key, data) {
        var cipher = crypto.createCipher('aes-256-cbc', key);
        var crypted = cipher.update(text, 'utf-8', 'hex');
        crypted += cipher.final('hex');

        return crypted;
    }

    function decrypt(key, data) {
            var decipher = crypto.createDecipher('aes-256-cbc', key);
            var decrypted = decipher.update(data, 'hex', 'utf-8');
            decrypted += decipher.final('utf-8');

            return decrypted;
    }
};

