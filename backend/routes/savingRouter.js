const express = require("express");
const usersController = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");
const savingController = require("../controllers/savingCtrl");
const savingRouter = express.Router();

//!get
savingRouter.get(
    "/api/v1/savings/get",
    isAuthenticated,
    savingController.get
  );
//!add
savingRouter.post(
  "/api/v1/savings/create",
  isAuthenticated,
  savingController.create
);
//! update
savingRouter.put(
  "/api/v1/savings/update/:id",
  isAuthenticated,
  savingController.update
);
//! delete
savingRouter.delete(
  "/api/v1/savings/delete/:id",
  isAuthenticated,
  savingController.delete
);

module.exports = savingRouter;
