function chunk(str, size) {
    return str.match(new RegExp('.{1,' + size + '}$', 'gms'));
}

function getToday(){
  let d = new Date();
  return `${d.getFullYear()}/${('0'+(d.getMonth()+1)).slice(-2)}/${('0'+d.getDate()).slice(-2)}_${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}
function formatMsg(config, message){
  let domain = (config.domain)?config.domain:'teloggo';
  let code = '```';
  if( typeof message === 'string' ){
    _message = message;
  } else {
    _message = message.toString(message);
    if( _message === '[object Object]' ){
      _message = JSON.stringify(message);
    }
  }
  let _m = `*${domain} - ${getToday()}*\n\n${code} ${_message} ${code}`;
  return chunk(_m, 4000);
}

module.exports = exports = formatMsg;
