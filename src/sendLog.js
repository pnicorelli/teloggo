const https = require('https');
var querystring = require('querystring');
const utils = require('./utils');

const host = 'api.telegram.org';

function sendLog(config, message, level){
  const token = utils.parseToken(config);
  if( token === null){
    throw new Error('teloggo needs a token!');
  }
  const chatId = utils.parseChatId(config);
  if( chatId === null){
    throw new Error('teloggo needs a chatId!');
  }


  const packet = querystring.stringify({
    chat_id: chatId,
    text: message,
    parse_mode: 'Markdown'
  });

  const apiUrl = `/bot${token}/sendMessage`
  const options = {
      host: host,
      port: '443',
      path: apiUrl,
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  };

  // request object
  var req = https.request(options, function (res) {
    var result = '';
    res.on('data', function (chunk) {
      result += chunk;
    });
    res.on('end', function () {
      //check the telegram response
      let response = JSON.parse(result);
      if( !response.ok ){
        let err = `HTTP-${response.error_code}: ${response.description}\nPacket:\n${packet}\n\n`;
        throw new Error(err)
      }
      return
    });
    res.on('error', function (err) {
      throw new Error(err);
    })
  });

  // req error
  req.on('error', function (err) {
    throw new Error(err);
  });

  //send request witht the postData form
  req.write(packet);
  req.end();
}

module.exports = exports = sendLog;
