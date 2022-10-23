"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoiceCountById = exports.updateInvoice = void 0;
const models_1 = require("../models");
const mongoose_1 = require("../services/mongoose");
const utils_1 = require("../utils");
function updateInvoice(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id: id } = req.body;
        const { count } = yield (0, mongoose_1.findById)(models_1.Invoice, id);
        const updateInvoice = (0, mongoose_1.updateById)(models_1.Invoice, id, { count: count + 1 });
        (0, utils_1.controllerResponse)(updateInvoice, 200, 400, res);
    });
}
exports.updateInvoice = updateInvoice;
function getInvoiceCountById(req, res) {
    const { id } = req.params;
    const invoice = (0, mongoose_1.findById)(models_1.Invoice, id);
    (0, utils_1.controllerResponse)(invoice, 200, 400, res);
}
exports.getInvoiceCountById = getInvoiceCountById;
