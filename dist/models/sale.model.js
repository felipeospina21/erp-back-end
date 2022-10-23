"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
const mongoose_1 = require("mongoose");
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
const orderedProductsSchema = new mongoose_1.Schema({
    item: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true, autopopulate: { select: '-image' } },
    discount: { type: Number, required: true },
    quantity: { type: Number, required: true },
    rowTotal: { type: Number, required: true },
});
const discountsSchema = new mongoose_1.Schema({
    concept: { type: String, required: true },
    value: { type: Number, required: true },
});
orderedProductsSchema.plugin(mongoose_autopopulate_1.default);
discountsSchema.plugin(mongoose_autopopulate_1.default);
const saleSchema = new mongoose_1.Schema({
    clientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
        autopopulate: { select: 'name' },
    },
    deliveryCity: {
        type: String,
        required: true,
    },
    orderedProducts: {
        type: [orderedProductsSchema],
        required: true,
    },
    paymentTerm: {
        type: Number,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    withholdingTax: {
        type: Number,
    },
    invoiceRef: { type: String, unique: true },
    saleRequestRef: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    discounts: { type: [discountsSchema] },
    creditNotes: { type: [discountsSchema] },
}, {
    timestamps: true,
});
saleSchema.plugin(mongoose_autopopulate_1.default);
exports.Sale = (0, mongoose_1.model)('Sale', saleSchema);
