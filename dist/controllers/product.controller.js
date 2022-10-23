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
exports.updateProductStockInBatch = exports.updateProductStockReserved = exports.updateProductStockAvailable = exports.updateProductById = exports.deleteProductById = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const models_1 = require("../models");
const mongoose_1 = require("../services/mongoose");
const utils_1 = require("../utils");
function createProduct(req, res) {
    const payload = req.body;
    const newProduct = (0, mongoose_1.createNewElement)(models_1.Product, payload);
    (0, utils_1.controllerResponse)(newProduct, 201, 400, res);
}
exports.createProduct = createProduct;
function getProducts(req, res) {
    const products = (0, mongoose_1.findAll)(models_1.Product, 'name');
    (0, utils_1.controllerResponse)(products, 200, 400, res);
}
exports.getProducts = getProducts;
function getProductById(req, res) {
    const { id } = req.params;
    const product = (0, mongoose_1.findById)(models_1.Product, id);
    (0, utils_1.controllerResponse)(product, 200, 400, res);
}
exports.getProductById = getProductById;
function deleteProductById(req, res) {
    const { _id: id } = req.body;
    const deletedProduct = (0, mongoose_1.deletetById)(models_1.Product, id);
    (0, utils_1.controllerResponse)(deletedProduct, 200, 400, res);
}
exports.deleteProductById = deleteProductById;
function updateProductById(req, res) {
    const { _id: id, category, name, price, stockAvailable, image } = req.body;
    const update = { category, name, image, price: Number(price), stockAvailable: Number(stockAvailable) };
    const updatedProduct = (0, mongoose_1.updateById)(models_1.Product, id, update);
    (0, utils_1.controllerResponse)(updatedProduct, 200, 400, res);
}
exports.updateProductById = updateProductById;
function updateProductStockAvailable(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id: id, quantity } = req.body;
        const { stockAvailable: currentStock } = yield (0, mongoose_1.findById)(models_1.Product, id, 'stockAvailable -_id -category');
        let update;
        if (currentStock >= quantity) {
            update = { stockAvailable: currentStock - quantity };
        }
        else {
            update = { stockAvailable: 0 };
        }
        const updatedProduct = (0, mongoose_1.updateById)(models_1.Product, id, update);
        (0, utils_1.controllerResponse)(updatedProduct, 200, 400, res);
    });
}
exports.updateProductStockAvailable = updateProductStockAvailable;
function updateProductStockReserved(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id: id, stockReserved, method } = req.body;
        let update = yield (0, mongoose_1.findById)(models_1.Product, id, 'stockReserved -_id -category');
        switch (method) {
            case 'add':
                update = { stockReserved: Number(update.stockReserved) + Number(stockReserved) };
                break;
            case 'substract':
                update = { stockReserved: update.stockReserved - Number(stockReserved) };
                break;
            default:
                break;
        }
        const updatedProduct = (0, mongoose_1.updateById)(models_1.Product, id, update);
        (0, utils_1.controllerResponse)(updatedProduct, 200, 400, res);
    });
}
exports.updateProductStockReserved = updateProductStockReserved;
function updateProductStockInBatch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const newStockPromises = [];
        for (const key in body) {
            const { stockAvailable: currentStock } = yield (0, mongoose_1.findById)(models_1.Product, key, 'stockAvailable -_id -category');
            const newStock = Number(currentStock) + Number(body[key]);
            newStockPromises.push((0, mongoose_1.updateById)(models_1.Product, key, { stockAvailable: newStock }));
        }
        try {
            yield Promise.all(newStockPromises);
            res.status(200).json({ message: 'Productos actualizados' });
        }
        catch (error) {
            res.status(400).json({ message: 'Error al actualizar inventario' });
        }
    });
}
exports.updateProductStockInBatch = updateProductStockInBatch;
