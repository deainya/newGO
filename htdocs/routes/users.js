module.exports = function(apiRoutes, jsonParser, mongo, mail) {

  apiRoutes.post("/user/delete", (req, res) => {
    let data = req.body.d || {};
    let email = data.email;
    mongo.users().deleteOne({"email": email}, {}, (error, result) => {
      if (error) { res.sendStatus(400); }
      else { res.status(201).send({ success: true, message: 'User deleted' }); }
    });
  });

}
