var  colors = require('colors'),
    XRegExp = require('xregexp').XRegExp;
module.exports = function (data, options){
  if (options.token){
    data = data.replace(options.token, '$&'.inverse.red);
  }

  data = defaultColors(data);

  if (options.words !== {} ){
    data = defaultWords(data, options.words);
  }
  data += '\n';
  return data;
};

function defaultColors(data){
  data = data.replace(/((sig(hup|int|quit|ill|abrt|fpe|kill|segv|pipe|alrm|term|usr1|usr2|chld|cont|stop|tstp|tin|tout|bus|poll|prof|sys|trap|urg|vtalrm|xcpu|xfsz|iot|emt|stkflt|io|cld|pwr|info|lost|winch|unused)))/gi,'$1'.red)
  .replace(/(unknown)/i, '$1'.italic.cyan)//Unknown message
  .replace(/(\d{1,2}(\-|\/)\d{1,2}(\-|\/)\d{2,4})/g,'$1'.bold.cyan)//Dates
  .replace(/([\d]{1,2}\:[\d]{1,2}\:[\d]{1,2}(\:[\d]{3,4})?)/g,'$1'.bold.cyan)//Times
  .replace(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Nov|Dec)/ig,'$1'.cyan)
  //E-mail addresses
  .replace(/([a-z0-9-_=\\\.+]+@([a-z0-9-_\.]+)+(\.[a-z]{2,4})+)/g,'$1'.green.bold)
  //localhosts
  .replace(/(((localhost)|(\w*::\w+)+)(:\d{1,5})?)/g,'$1'.bold.blue)
  .replace(/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\b/g,'$1'.bold.blue)//IP4 numbers
  .replace(/(([\da-fA-F]{1,4}:){7}([\da-fA-F]{1,4}))/g,'$1'.bold.blue)//IP6 numbers
  .replace(/(([0-9A-F]{2}[:\-]){5}([0-9A-F]{2}))/ig,'$1'.bold.white)//MAC addresses
  //PIDS
  .replace(/(\w+)?\[(\d+)\]/g,'$1'.bold.green+'['.bold.green+'$2'.bold.white + ']'.bold.green)
  //HTTP GET
  .replace(/(http get)/gi, '$1'.underline.green)
  //HTTP POST
  .replace(/(http post)/gi, '$1'.underline.green)
  //HTTP HEAD
  .replace(/(http head)/gi, '$1'.underline.green)
  //HTTP PUT
  .replace(/(http put)/gi, '$1'.underline.green)
  //HTTP CONNECT
  .replace(/(http connect)/gi, '$1'.underline.green)
  //HTTP TRACE
  .replace(/(http trace)/gi, '$1'.underline.green)
  //HTTP status codes (200, 404, etc)
  .replace(/(http )(1[0-9][0-9])/gi, ('$1'.grey + '$2'.grey).inverse)
  .replace(/(http )(2[0-9][0-9])/gi, ('$1'.green + '$2'.green).inverse)
  .replace(/(http )(3[0-9][0-9])/gi, ('$1'.yellow + '$2'.yellow).inverse)
  .replace(/(http )(4[0-9][0-9])/gi, ('$1'.red + '$2'.red).inverse)
  .replace(/(http )(5[0-9][0-9])/gi, ('$1'.magenta + '$2'.magenta).inverse)
  //Transfer times
  //Transfer sizes
  //Debug messages
  .replace(/(^debug)/g, '$1'.blue)
  //Error messages
  .replace(/(^error)/g, '$1'.red.bold)
  .replace(/(error=.*),/g, '$1'.red.bold + ',')
  .replace(/(^Error:\s.*$)/g, '$1'.red)
  .replace(/(^\s+at.*)/g, '$1'.red)
  //Warnings
  .replace(/((warn\b|warning))/g, '$1'.yellow)
  //info
  .replace(/(^info)/g, '$1'.green)
  //data
  .replace(/(^data)/g, '$1'.grey)
  //help
  .replace(/(^help)/g, '$1'.cyan)
  //verbose
  .replace(/(^verbose)/g, '$1'.cyan)
  //port
  .replace(/(port)=(\d+)/ig, '$1'.green + '=' + '$2'.blue.bold)
  
  //Bad words
  //Good words
  //System words
  //Sender process
  //Directory names
  //File names
  //Protocols
  //Services
  //Sizes
  //.replace(/(\d+(\.\d+)?[k|m|g|t]i?b?(ytes?)?)/g,'$1'.magenta)
  //Version numbers
  .replace(/(\w+[\s=]?)?((v|@)(\d+\.){1}((\d|[a-z])+\.)*(\d|[a-z])+)/g, '$1'.bold.magenta + '$2'.bold.cyan )
  //Memory addresses
  .replace(/(0x(\d|[a-f])+)/g,'$1'.bold.cyan)
  //URIs (http://, ftp://, etc)
  .replace(/((\w|\-|_){2,}:\/\/(\S+\/?)(:\d+\/?)?)/g,'$1'.bold.green)
  //Proxy MISS
  //Proxy PARENT
  //Proxy DIRECT
  //Proxy HIT
  //Proxy DENIED
  //Remote user (proxy/http)
  //Proxy REFRESH
  //Proxy SWAPFAIL
  //Content type (http/proxy)
  //Proxy CREATE
  //Proxy SWAPIN
  //Proxy SWAPOUT
  //Proxy RELEASE
  //Proxy swap number
  //Usernames
  //Numbers
  //Subject lines (procmail)
  //Signal names
  //Incoming mail (exim)
  //Outgoing mail (exim)
  //Unique ID (exim)
  //'last message repeated N times'
  //RFC822 Field
  //Chain names (ulogd)
  //Percentages
  //Various keywords (like PHP in php.log, etc)
  //package status (dpkg)
  //package name (dpkg)
  //number
  .replace(/(\s[\+\-][\d.]+)/g, '$1'.cyan)
  //integer
  .replace(/(\s[\d]+)/g, '$1'.cyan)
  //silly
  .replace(/silly/gi, 'silly'.rainbow);
  return data;
}

function defaultWords(data, words){//TODO put thes in map id it increases performance
  if(words["good"]){
    words.good.forEach(function(ele){
      var re = new RegExp('\\b'+XRegExp.escape(ele)+'\\b', "gi");
      data = data.replace(re, '$&'.green);
    });
  }
  if(words["bad"]){
    words.bad.forEach(function(ele){
      var re = new RegExp('\\b'+XRegExp.escape(ele)+'\\b', "gi");
      data = data.replace(re, '$&'.yellow);
    });
  }
  if(words["error"]){
    words.error.forEach(function(ele){
      var re = new RegExp('\\b'+XRegExp.escape(ele)+'\\b', "gi");
      data = data.replace(re, '$&'.red);
    });
  }
  if(words["system"]){
    words.system.forEach(function(ele){
      var re = new RegExp('\\b'+XRegExp.escape(ele)+'\\b', "gi");
      data = data.replace(re, '$&'.grey);
    });
  }
  return data;
}