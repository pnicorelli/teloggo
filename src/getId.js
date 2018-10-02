const https = require('https');
const utils = require('./utils');
const host = 'api.telegram.org';


function getId(config){
  var token = utils.parseToken(config);
  if( token === null){
    throw new Error('teloggo needs a token!');
  }
  const resource = `/bot${token}/getUpdates`
  const options = {
    host: host,
    port: '443',
    path: resource,
    method: 'GET',
  };


  var req = https.request(options, function (res) {
    var result = '';

    // compose http response
    res.on('data', function (chunk) {
      result += chunk;
    });

    // read response
    res.on('end', function () {
      let response = JSON.parse(result);
      let who = response.result.filter( (obj)=>{
        // match only /getId messages
        return obj.message.text.match('\/getId') && !obj.message.from.is_bot;
      }).map( (obj)=>{
        // remap object with needs
        return {
          date: obj.message.date,
          username: obj.message.from.username,
          first_name: obj.message.from.first_name,
          last_name: obj.message.from.last_name,
          id: obj.message.from.id,
        }
      }).sort( (a, b)=>{
        // sort by date
        return b.date > a.date;
      }).filter( (obj, i, arr)=>{
        // remove duplicate (username/chatId as index)
        return i == arr.findIndex((t) => (
          t.username === obj.username && t.id === obj.id
        ));
      });

      // write output
      who.forEach( (obj)=>{
        let d = new Date(obj.date*1000);
        let df = `${d.getFullYear()}/${('0'+(d.getMonth()+1)).slice(-2)}/${('0'+d.getDate()).slice(-2)} ${('0'+d.getHours()).slice(-2)}:${('0'+d.getMinutes()).slice(-2)}`;
        console.log(`CHAT ID ${obj.id} ON ${df} FROM @${obj.username} (${obj.first_name} ${obj.last_name})`);
      })
    });

    res.on('error', function (err) {
      console.log(err);
    })
  });

  // req error
  req.on('error', function (err) {
    console.log(err);
  });

  //send request
  req.end();
}

module.exports = exports = getId;
