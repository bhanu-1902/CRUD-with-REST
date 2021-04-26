var express = require("express");
var router = express.Router();
const qs = require('qs');

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
    db.get("products").remove({ id: req.params.id }).write();
    res.status(204).send();
  });

  router.route('/products/search').get((req, res) => {

    const keywords = req.query.keywords;
    const result = db.get("products").filter((_) => {
      const fullText = _.description + _.name + _.color;
      return fullText.indexOf(keywords) !== -1;
    });

    res.send(result);
  });

  router.route('/products/detailSearch').get((req, res) => {

    const query = qs.parse(req.query);
    const result = db.get("products").filter((_) => {
      
      return Object.keys(query).reduce((found, key) => {

        const obj = query[key];

        switch(obj.op){
          case "lt":
            found = found && _[key] < obj.val;
            break;
          
            case "eq":
              found = found && _[key] == obj.val;
              break;

            default:
              found = found && _[key].indexOf(obj.val) !== -1;
              break;
        }
        
        return found;
      }, true)
    });

    res.send(result);
  });


  router.get("/products/:id", (req, res) => {
    const result = db.get("products").find({ id: req.params.id }).value();
    if (result) {
      res.send(result);
    } else {
      res.status(404).send();
    }

  });



  return router;
};
