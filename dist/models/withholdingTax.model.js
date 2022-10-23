"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithholdingTax = void 0;
const mongoose_1 = require("mongoose");
const withholdingTaxSchema = new mongoose_1.Schema({
    concept: { type: String, required: true },
    base: { type: Number, required: true },
    percentage: { type: Number, required: true },
}, {
    timestamps: true,
});
exports.WithholdingTax = (0, mongoose_1.model)('WithholdingTax', withholdingTaxSchema);
