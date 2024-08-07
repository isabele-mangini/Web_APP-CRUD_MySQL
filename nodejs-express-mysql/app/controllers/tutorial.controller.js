const db = require("../models"); 
const BD_uge = db.bd_UGE;
const BD_ugts = db.bd_UGTS;
const Op = db.Sequelize.Op;

//Nao sei se esta funcionando testar depois 
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tests } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, tests, totalPages, currentPage };
};

///post for creating a new test in the database 
exports.create = (req,res) => {

    // for validating the body of the request
    //we can accept empty fields depending on the field 
    if (!req.body.test){
        res.status(400).send({
            message: "Test Title can not be empty"
        });
        return; 
    }
    // some conditions for approve the request 
    if (!req.body.scenario){
        res.status(400).send({
            message: "Scenario can not be empty"
        });
        return; 
    }

    // Creation 
    const teste = {
        scenario: req.body.scenario,
        test: req.body.test,
        orig: req.body.orig,
        agr: req.body.agr, 
        cat: req.body.cat,
        n_ugts: req.body.n_ugts,
        objet_du_test: req.body.objet_du_test
    };
    
    // Saving in the database 
    BD_uge.create(teste)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error ocurred while creating the test"
        });
    });
};

///post for creating a new test in the database 
exports.create_ugts = (req,res) => {

    // for validating the body of the request
    //we can accept empty fields depending on the field 
    if (!req.body.test){
        res.status(400).send({
            message: "Test Title can not be empty"
        });
        return; 
    }
    // some conditions for approve the request 
    if (!req.body.scenario){
        res.status(400).send({
            message: "Scenario can not be empty"
        });
        return; 
    }

    // Creation 
    const teste = {
        scenario: req.body.scenario,
        test: req.body.test,
        orig: req.body.orig,
        agr: req.body.agr, 
        cat: req.body.cat,
        n_ugts: req.body.n_ugts,
        objet_du_test: req.body.objet_du_test
    };
    
    // Saving in the database 
    BD_ugts.create_ugts(teste)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error ocurred while creating the test"
        });
    });
};

// get for all the tests in the database -> scrolling scream or pagination ? 
exports.findAll = (req,res) => {
    const { page, size, scenario } = req.query;
    //const scenario = req.query.scenario;
    var condition = scenario ? { scenario: { [Op.like]: `%${scenario}%`}} : null;

    const { limit, offset } = getPagination(page, size);

    BD_uge.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bd_UGEs."
      });
    });
};

// get for all the tests in the database -> scrolling scream or pagination ? 
exports.findAll_ugts = (req,res) => {
    const { page, size, scenario } = req.query;
    //const scenario = req.query.scenario;
    var condition = scenario ? { scenario: { [Op.like]: `%${scenario}%`}} : null;

    const { limit, offset } = getPagination(page, size);

    BD_ugts.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bd_UGEs."
      });
    });
};

// get by title 
exports.findOne = (req,res) => {
    const id = req.params.id; 
    
    BD_uge.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        }else {
            res.status(404).send({
                message: `cannot Find tutorial with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Test with id=" + id
        });
    });
};

// get by title 
exports.findOne_ugts = (req,res) => {
    const id = req.params.id; 
    
    BD_ugts.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        }else {
            res.status(404).send({
                message: `cannot Find tutorial with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Test with id=" + id
        });
    });
};

// put mis a jour de teste avec l'id 
exports.update = (req,res) => {
    const id = req.params.id;

    BD_uge.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Test a bien été mis à jour."
            });
        } else {
            res.send({
                message: `Erreur: Impossible de mettre à jour avec l'id=${id}. Peut-être que req.params est vide`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Impossible de mettre à jour le test avec l'id=" +id 
        });
    });
};

// put mis a jour de teste avec l'id 
exports.update_ugts = (req,res) => {
    const id = req.params.id;

    BD_ugts.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Test a bien été mis à jour."
            });
        } else {
            res.send({
                message: `Erreur: Impossible de mettre à jour avec l'id=${id}. Peut-être que req.params est vide`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Impossible de mettre à jour le test avec l'id=" +id 
        });
    });
};

// delete by id 
exports.delete = (req,res) => {
    const id = req.params.id 

    BD_uge.destroy({
        where: { id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Test a bien été supprimé"
            });
        } else {
            res.send({
                message: `Erreur: Impossible de supprimer le test avec l'id=${id}. Test pas trouvé` 
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Impossible de supprimer le test avec l'id=" +id
        });
    });
};

// delete by id 
exports.delete_ugts = (req,res) => {
    const id = req.params.id 

    BD_ugts.destroy({
        where: { id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Test a bien été supprimé"
            });
        } else {
            res.send({
                message: `Erreur: Impossible de supprimer le test avec l'id=${id}. Test pas trouvé` 
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Impossible de supprimer le test avec l'id=" +id
        });
    });
};