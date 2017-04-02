"use strict";

let mongo = require('mongodb');
let client = mongo.MongoClient;
let _db;

module.exports = {
  ObjID: mongo.ObjectID,
  connect(url) {
    client.connect(url, (err, db) => {
      if(err) {
        console.log("Error connecting to Mongo");
        process.exit(1);
      }
      _db = db;
      console.log("Connected to Mongo");
    });
  },
  actions(){
    return _db.collection('actions');
  },
  orders(){
    return _db.collection('orders');
  },
  tradepoints(){
    return _db.collection('tradepoints');
  },
  users(){
    return _db.collection('users');
  }
  ,
  find(collection, query, projection) {
    var c = mongo.db.collection(collection);
    return c.find(query, projection);
    /*, (error, result) => {
      if(error) { console.log(error + " " + result); return error; }
      else {
        console.log( "Document deleted: " + JSON.stringify(query) );
        return result;
      }
    });*/
  }
  ,
  delete(collection, query, projection) {
    var c = mongo.db.collection(collection);
    c.deleteOne(query, projection, (error, result) => {
      if(error) { console.log(error + " " + result); return error; }
      else {
        console.log( "Document deleted: " + JSON.stringify(query) );
        return result;
      }
    });
  }
  // mongo wrap
  //function(collection /*mongo.smth*/, func, query, projection) {
  //  collection.find(res, query, projection).toArray((err, docs) => {
  //    if (err) { res.sendStatus(400); }
  //    res.json(docs);
  //  });
  //}
  /*
  Users
  get
  getById /email
  setById / email / set obj: data, tradepoint, tradepoints
  deleteById / email
  */
}
