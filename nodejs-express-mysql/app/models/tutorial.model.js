module.exports = (sequelize, Sequelize) => {
    const BD_uge = sequelize.define("bd_UGE", {
        scenario: {
            type: Sequelize.STRING
        },
        test: {
            type: Sequelize.STRING
        },
        orig: {
            type: Sequelize.STRING
        },
        agr: {
            type: Sequelize.STRING
        },
        cat: {
            type: Sequelize.STRING
        },
        n_ugts: {
            type: Sequelize.STRING
        },
        objet_du_test: {
            type: Sequelize.STRING
        }
    });

    const BD_ugts = sequelize.define("bd_UGTS", {
        scenario: {
            type: Sequelize.STRING
        },
        test: {
            type: Sequelize.STRING
        },
        orig: {
            type: Sequelize.STRING
        },
        agr: {
            type: Sequelize.STRING
        },
        cat: {
            type: Sequelize.STRING
        },
        n_ugts: {
            type: Sequelize.STRING
        },
        objet_du_test: {
            type: Sequelize.STRING
        }
    });

    return BD_ugts, BD_uge;
}