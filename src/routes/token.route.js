const tokenControllers = require("../controllers/token.controller");

module.exports = (app) => {
    app.post("/api/generate-token", tokenControllers.create);
    app.get("/api/report", tokenControllers.getReport);

};