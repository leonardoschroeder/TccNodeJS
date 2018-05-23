module.exports = function (context, req) {
    var http = require('http');
    var crypto = require('crypto');
    var key = "supersecretkey";
    var text = "testandocriptografia";
    var encryptedText = encrypt(key, text);
    var decryptedText = decrypt(key, encryptedText);
	
	
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

    context.res = {
            // status: 200, /* Defaults to 200 */
            body: encryptedText + ";" + decryptedText
        };

    context.done();
};
