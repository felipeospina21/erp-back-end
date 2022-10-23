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
exports.cancelSaleById = exports.updateSaleStatus = exports.getSaleById = exports.getSales = exports.createSale = void 0;
const models_1 = require("../models");
const mongoose_1 = require("../services/mongoose");
const utils_1 = require("../utils");
function createSale(req, res) {
    const payload = req.body;
    const newSale = (0, mongoose_1.createNewElement)(models_1.Sale, payload);
    (0, utils_1.controllerResponse)(newSale, 201, 400, res);
}
exports.createSale = createSale;
function getSales(req, res) {
    const sales = (0, mongoose_1.findAll)(models_1.Sale);
    (0, utils_1.controllerResponse)(sales, 200, 400, res);
}
exports.getSales = getSales;
function getSaleById(req, res) {
    const { id } = req.params;
    const sale = (0, mongoose_1.findById)(models_1.Sale, id);
    (0, utils_1.controllerResponse)(sale, 200, 400, res);
}
exports.getSaleById = getSaleById;
function updateSaleStatus(req, res) {
    const { id } = req.params;
    const { status, invoiceRef, discounts, creditNotes } = req.body;
    const sale = (0, mongoose_1.updateById)(models_1.Sale, id, { status, invoiceRef, discounts, creditNotes });
    (0, utils_1.controllerResponse)(sale, 200, 400, res);
}
exports.updateSaleStatus = updateSaleStatus;
function cancelSaleById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { orderedProducts } = yield (0, mongoose_1.updateById)(models_1.Sale, id, { status: 'anulado' });
        for (const { item, quantity } of orderedProducts) {
            const { stockAvailable: currentAvailable, stockReserved: currentReserved } = yield (0, mongoose_1.findById)(models_1.Product, item._id, 'stockAvailable stockReserved');
            yield (0, mongoose_1.updateById)(models_1.Product, item._id, {
                stockAvailable: currentAvailable + quantity,
                stockReserved: currentReserved - quantity,
            });
        }
        (0, utils_1.controllerResponse)(Promise.resolve({ message: 'sale canceled' }), 200, 400, res);
    });
}
exports.cancelSaleById = cancelSaleById;
