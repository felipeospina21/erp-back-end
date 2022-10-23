"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const mongoose_1 = require("mongoose");
const invoiceSchema = new mongoose_1.Schema({
    count: { type: Number, required: true },
}, {
    timestamps: true,
});
exports.Invoice = (0, mongoose_1.model)('Invoice', invoiceSchema);
