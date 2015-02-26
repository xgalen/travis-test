exports.loadFamilias = function (req, res, next) {
    var query = "SELECT * FROM FAMILIAS_IDIOMAS WHERE ID_IDIOMA='ESESESESESES'";
    global.mysql.query(query, function (err, rows) {
        if (err) {
            console.log(err);
            console.trace(err.stack);
            res.statusCode = 503;
            return res.end();
        }
        res.locals.familias = rows;
        next();
    });
};

function hasSEO(item) {
    return item.SEO.length > 0;
}

exports.getFamilias = function(req, res) {
    res.json({
        familias: res.locals.familias.filter(hasSEO)
    });
};

exports.loadFamiliaById = function(req, res, next) {
    var query = "SELECT * FROM FAMILIAS_IDIOMAS WHERE ID_IDIOMA='ESESESESESES' AND ID_FAMILIA='" + req.params.idFamilia + "'";
    global.mysql.query(query, function (err, rows) {
        if (err) {
            console.log(err);
            console.trace(err.stack);
            res.statusCode = 503;
            return res.end();
        }
        res.locals.familia = rows && rows.length > 0 ? rows[0] : null;
	next();
    });
};

exports.getFamilia = function (req, res) {
    if (res.locals.familia) {
        res.json(res.locals.familia);
    } else {
        res.statusCode = 404;
        res.end();
    }
};
