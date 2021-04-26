var express = require("express");
var router = express.Router();

module.exports = function (db) {
  router.get("/products", (req, res) => {
    res.send(db.get("products").value());
  });

  router.post("/products", (req, res) => {
    const newProduct = req.body;
    res.send(db.get("products").insert(newProduct).write());
  });

  router.patch("/products/:id", (req, res) => {
    res.send(db.get("products").find({ id: req.params.id }).assign(req.body).write());
  });

  router.delete("/products/:id", (req, res) => {
    db.get("products").remove({id: req.params.id}).write();
    res.status(204).send();
  });

  router.get("/products/:id", (req, res) => {
    const result = db.get("products").find({ id: req.params.id }).value();
    if(result){
      res.send(result);
    } else{
      res.status(404).send();
    }

  });

  return router;
};
