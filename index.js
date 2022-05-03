var express = require('express');
var requestIp = require('request-ip');
var log4js = require('log4js');

var app = express();
     
const PORT = 9000;
const HOST = '0.0.0.0';
  
//Uzycie log4js w celu zapisywania do pliku
log4js.configure({
    appenders: { ip: { type: "file", filename: "ip.log" } },
    categories: { default: { appenders: ["ip"], level: "info" } }
});

var logger = log4js.getLogger('ip');

logger.info(`Serwer nasluchuje na porcie ${PORT}`)


app.get('/',function(request, response) {
    var clientIp = requestIp.getClientIp(request);
    var date = new Date()
    logger.info(`Czas u klienta ${date}, z adresu IP ${clientIp}`);
    response.send("Hello on my website!");
});

app.listen(PORT, HOST);