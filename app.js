var restify = require("restify"),
    secret = "challenge-database-api",
    algorithm = 'sha256',
    server = restify.createServer(),
    endpoint = "/api/challenges/:itemId",
    db = require("./database.js"),
    crypto = require("crypto");

server.use(restify.bodyParser());

server.put(endpoint, put);
server.post(endpoint, post);
server.del(endpoint, del);
server.get(endpoint, restify.queryParser(), gets);

server.listen(9000);

function put(req, res, next) {
    var 
        hmac = crypto.createHmac(algorithm, secret),
        data = req.body,
        digest = hmac.update("/api/challenges/;PUT").digest("hex"),
        itemId = req.params.itemId;
    
    if (digest != data.digest) {
        res.send(401);
        return next();
    }
    
    db.updateChallenge(itemId, data.challenge, function (err) {
        if (err) {
            res.send(200, {
                "challengeId": itemId,
                "result": false,
                "reason": err.toString()
            });
        } else {
            res.send(200, {
                "challengeId": itemId,
                "result": true
            });
        }
        
        return next();
    });
}

function post(req, res, next) {
    var 
        hmac = crypto.createHmac(algorithm, secret),
        data = req.body,
        digest = hmac.update("/api/challenges/;POST").digest("hex");
    
    if (digest != data.digest) {
        res.send(401);
        return next();
    }
    
    db.insertChallenge(data.challenge, function (lastId) {
        if (lastId) {
            res.send(200, {
                "challengeId": lastId,
                "result": true
            });
        } else {
            res.send(200, {
                "result": false,
                "reason": "Something went wrong"
            });
        }
        return next();
    });
}

function del(req, res, next) {
    var 
        hmac = crypto.createHmac(algorithm, secret),
        data = req.body,
        digest = hmac.update("/api/challenges/;DELETE").digest("hex"),
        itemId = req.params.itemId;
        
    if (digest != data.digest) {
        res.send(401);
        return next();
    }
    
    db.deleteChallenge(itemId, function () {        
        res.send(200, {
            "result": true
        });
        
        return next();
    })
}

function gets(req, res, next) {
    var 
        hmac = crypto.createHmac(algorithm, secret),
        data = req.query,
        digest = hmac.update("/api/challenges/;GET").digest("hex"),
        itemId = req.params.itemId;
    
    if (digest != data.digest) {
        res.send(401);
        return next();
    }
    
    db.getChallenge(itemId, function (challenge) {
        if (challenge) {
            res.send(200, {
                "challenge": challenge,
                "result": true
            });
        } else {
            res.send(200, {
                "result": false,
                "reason": "No such challenge"
            });
        }
        
        return next();
    })
}