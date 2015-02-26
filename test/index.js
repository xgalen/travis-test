var request = require('supertest'),
    should = require('should'),
    app = require('../app');
describe('GET', function () {
    it('Si no está autenticado no puede consultar la API', function (done) {
        request(app).get('/api').expect(403).end(function (err) {
            if (err) {
                console.log(err);
                return done(err);
            }
            done();
        });
    });
    it('info sobre la aplicación', function (done) {
        request(app).get('/api?auth=1').expect(200).end(function (err, res) {
            if (err) {
                console.log(err);
                return done(err);
            }
            res.body.should.have.property('name');
            res.body.should.have.property('version');
            res.body.name.should.equal("Energy API");
            res.body.version.should.equal("0.0.1");
            done();
        });
    });
    it('obtener las familias', function (done) {
        request(app).get('/api/familias?auth=1').expect(200).end(function (err, res) {
            if (err) {
                console.log(err);
                return done(err);
            }
            res.body.should.have.property('familias');
            res.body.familias.length.should.equal(4);
            done();
        });
    });
    it('obtener una familia concreta', function (done) {
        request(app).get('/api/familias/agalfoflfmhl?auth=1').expect(200).end(function (err, res) {
            if (err) {
                console.log(err);
                return done(err);
            }
            res.body.should.have.property('ID_FAMILIA');
            res.body.ID_FAMILIA.should.equal('agalfoflfmhl');
            done();
        });
    });
    it('si la familia no existe, 404 not found', function (done) {
        request(app).get('/api/familias/aaaaaaaa?auth=1').expect(404).end(function (err) {
            if (err) {
                console.log(err);
                return done(err);
            }
            done();
        });

    });
});
