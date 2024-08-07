module.exports = app => {
    
    const bd_UGES = require("../controllers/tutorial.controller.js");
    const bd_UGTS = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    //Create a test in the database for UGTS 
    router.post("/", bd_UGTS.create_ugts);
    
    //Create a test in the database 
    router.post("/", bd_UGES.create);

    //Find All tests or title
    router.get("/", bd_UGES.findAll);
    
    //Find All tests or title UGTS
    router.get("/", bd_UGTS.findAll_ugts);

    //Find One by id 
    router.get("/:id", bd_UGES.findOne);

    //Find One by id UGTS
    router.get("/:id", bd_UGTS.findOne_ugts);

    //Update test by id 
    router.put("/:id", bd_UGES.update);

    //Update test by id UGTS
    router.put("/:id", bd_UGTS.update_ugts);

    //Delete test by id 
    router.delete("/:id", bd_UGES.delete)

    //Delete test by id UGTS
    router.delete("/:id", bd_UGTS.delete_ugts)
 
    app.use('/api/test', router);

};