"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
const productSchema = new mongoose_1.Schema({
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true, autopopulate: { select: 'name' } },
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    stockAvailable: { type: Number, required: true },
    stockReserved: { type: Number, required: true },
    image: { type: String },
}, {
    timestamps: true,
});
productSchema.plugin(mongoose_autopopulate_1.default);
exports.Product = (0, mongoose_1.model)('Product', productSchema);
