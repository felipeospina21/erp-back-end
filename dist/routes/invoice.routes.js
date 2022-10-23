"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.invoiceRouter = (0, express_1.Router)();
exports.invoiceRouter.get('/:id', controllers_1.getInvoiceCountById);
exports.invoiceRouter.put('/', controllers_1.updateInvoice);
