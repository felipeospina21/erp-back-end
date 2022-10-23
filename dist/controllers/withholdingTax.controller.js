"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWithholdingTaxById = exports.getWithholdingTaxes = exports.updateWithholdingTax = exports.createWithholdingTax = void 0;
const models_1 = require("../models");
const mongoose_1 = require("../services/mongoose");
const utils_1 = require("../utils");
function createWithholdingTax(req, res) {
    const payload = req.body;
    const newTaxConcept = (0, mongoose_1.createNewElement)(models_1.WithholdingTax, Object.assign(Object.assign({}, payload), { percentage: payload.percentage / 100 }));
    (0, utils_1.controllerResponse)(newTaxConcept, 201, 400, res);
}
exports.createWithholdingTax = createWithholdingTax;
function updateWithholdingTax(req, res) {
    const { _id, concept, base, percentage } = req.body;
    const updateTaxConcept = (0, mongoose_1.updateById)(models_1.WithholdingTax, _id, { concept, base, percentage: percentage / 100 });
    (0, utils_1.controllerResponse)(updateTaxConcept, 200, 400, res);
}
exports.updateWithholdingTax = updateWithholdingTax;
function getWithholdingTaxes(req, res) {
    const taxConcepts = (0, mongoose_1.findAll)(models_1.WithholdingTax, 'concept');
    (0, utils_1.controllerResponse)(taxConcepts, 200, 400, res);
}
exports.getWithholdingTaxes = getWithholdingTaxes;
function getWithholdingTaxById(req, res) {
    const { id } = req.params;
    const taxConcept = (0, mongoose_1.findById)(models_1.WithholdingTax, id);
    (0, utils_1.controllerResponse)(taxConcept, 200, 400, res);
}
exports.getWithholdingTaxById = getWithholdingTaxById;
