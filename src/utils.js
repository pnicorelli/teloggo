var utils = {
  'parseToken': (config)=>{
    var token = (process.env.TELOGGO_TOKEN) ? process.ENV.TELOGGO_TOKEN : null;
    if( config && config.token ){
      token = config.token;
    }
    return token;
  },
  'parseChatId': (config)=>{
    var chatId = (process.env.TELOGGO_CHATID) ? process.ENV.TELOGGO_CHATID : null;
    if( config && config.chatId ){
      chatId = config.chatId;
    }
    return chatId;
  },
}




module.exports = exports = utils;
