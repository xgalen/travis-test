var express = require('express'),
    http = require('http'),
    mysql = require('mysql'),
    app = module.exports = express(),
    familias = require('./lib/familias');
app.set('mysqlConf', require('./mysql'));
app.set('view engine', 'jade');
//global.mysql = global.mysql ? global.mysql : mysql.createConnection(app.settings.mysqlConf);

function info(req, res) {
    var data = {
        name: "Energy API",
        version: "0.0.1"
    };
    res.json(data);
}

function auth(req, res, next) {
    if (req.query.auth == "1") {
        next();
    } else {
        res.statusCode = 403; // Forbidden
        res.end();
    }
}
// API
app.all('/api*', auth); 
app.get('/api', info);
app.get('/api/familias', familias.loadFamilias, familias.getFamilias);
app.get('/api/familias/:idFamilia', familias.loadFamiliaById, familias.getFamilia);
http.createServer(app).listen(3000, function () {
    console.log('Servidor funcionando en el puerto 3000.');
});
