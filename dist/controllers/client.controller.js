"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClientById = exports.deleteClientById = exports.getClientById = exports.getClients = exports.createClient = void 0;
const models_1 = require("../models");
const mongoose_1 = require("../services/mongoose");
const utils_1 = require("../utils");
function createClient(req, res) {
    const payload = req.body;
    const newClient = (0, mongoose_1.createNewElement)(models_1.Client, payload);
    (0, utils_1.controllerResponse)(newClient, 201, 400, res);
}
exports.createClient = createClient;
function getClients(req, res) {
    const clients = (0, mongoose_1.findAll)(models_1.Client, 'name');
    (0, utils_1.controllerResponse)(clients, 200, 400, res);
}
exports.getClients = getClients;
function getClientById(req, res) {
    const { id } = req.params;
    const client = (0, mongoose_1.findById)(models_1.Client, id);
    (0, utils_1.controllerResponse)(client, 200, 400, res);
}
exports.getClientById = getClientById;
function deleteClientById(req, res) {
    const { _id: id } = req.body;
    const deletedClient = (0, mongoose_1.deletetById)(models_1.Client, id);
    (0, utils_1.controllerResponse)(deletedClient, 200, 400, res);
}
exports.deleteClientById = deleteClientById;
function updateClientById(req, res) {
    const { _id: id, addres1, addres2, city, department, discount, email, name, paymentTerm, retailer, } = req.body;
    const update = { addres1, addres2, city, department, discount, email, name, paymentTerm, retailer };
    const updatedClient = (0, mongoose_1.updateById)(models_1.Client, id, update);
    (0, utils_1.controllerResponse)(updatedClient, 200, 400, res);
}
exports.updateClientById = updateClientById;
