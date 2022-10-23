"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
    addres1: { type: String, required: true },
    addres2: { type: String },
    city: { type: String, required: true },
    department: { type: String, required: true },
    discount: { type: Number, required: true },
    email: { type: String },
    idNumber: { type: String, required: true, unique: true },
    idType: { type: String, required: true },
    name: { type: String, required: true },
    paymentTerm: { type: String, required: true, enum: ['contado', '15', '30', '60'] },
    retailer: { type: Boolean, required: true },
    phone: { type: Number },
}, {
    timestamps: true,
});
exports.Client = (0, mongoose_1.model)('Client', clientSchema);
