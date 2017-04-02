module.exports = function(apiRoutes, jsonParser, mongo, mail) {



  apiRoutes.get("/tradepoints", (req, res) => {
    let city = req.query.city || {};
    let role = req.query.role || {};

    switch(role) {
      case 0:
        mongo.tradepoints().aggregate([{$match : {"city":city}}, {$group : { _id : "$wp", wp:{$first:"$wp"}, tradepoint:{$first:"$tradepoint"}, address:{$first:"$address"}, city:{$first:"$city"}}}]).toArray((error, docs) => {
          if(err) { res.sendStatus(400); } else { res.json( docs ); }
        });
      case 1:
        mongo.find('tradepoints', {"city":city}, {"_id":false}).toArray((error, docs) => {
          if(err) { res.sendStatus(400); } else { res.json( docs ); }
        });
      default: ;
    }
  }



}
