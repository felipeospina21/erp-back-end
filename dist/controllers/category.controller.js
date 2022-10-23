"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryById = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const models_1 = require("../models");
const mongoose_1 = require("../services/mongoose");
const utils_1 = require("../utils");
function createCategory(req, res) {
    const newCategory = (0, mongoose_1.createNewElement)(models_1.Category, req.body);
    (0, utils_1.controllerResponse)(newCategory, 201, 400, res);
}
exports.createCategory = createCategory;
function getCategories(req, res) {
    const categories = (0, mongoose_1.findAll)(models_1.Category);
    (0, utils_1.controllerResponse)(categories, 200, 400, res);
}
exports.getCategories = getCategories;
function getCategoryById(req, res) {
    const { id } = req.params;
    const product = (0, mongoose_1.findById)(models_1.Category, id);
    (0, utils_1.controllerResponse)(product, 200, 400, res);
}
exports.getCategoryById = getCategoryById;
function deleteCategoryById(req, res) {
    const { _id: id } = req.body;
    const deletedCategory = (0, mongoose_1.deletetById)(models_1.Category, id);
    (0, utils_1.controllerResponse)(deletedCategory, 200, 400, res);
}
exports.deleteCategoryById = deleteCategoryById;
