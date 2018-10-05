const getId = require('./src/getId');
const sendLog = require('./src/sendLog');
const formatMsg = require('./src/formatMsg');



class teloggo{
  constructor(config){
    if( !config ){
      config = {
        domain: 'teloggo'
      }
    }
    this.config = config;
  }

  getId(){
    return getId(this.config);
  }

  log(message){
    let _message = formatMsg(this.config, message);
    _message.forEach( (m)=>{
      sendLog(this.config, m);
    });
  }
}

module.exports = teloggo;
