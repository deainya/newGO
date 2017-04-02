module.exports = function(apiRoutes, jsonParser, mongo, mail) {



  apiRoutes.post("/user/delete", (req, res) => {
    let dataset = req.body.dataset || {};
    let email = dataset.email;
    mongo.delete('users', {"email": email}, {}, (error, result) => {
      if (error) { res.sendStatus(400); }
      else { res.status(201).send({ success: true, message: 'User deleted' }); }
    });
  });



}
