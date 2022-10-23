"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consecutive = void 0;
const mongoose_1 = require("mongoose");
const consecutiveSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    count: { type: Number, required: true },
}, {
    timestamps: true,
});
exports.Consecutive = (0, mongoose_1.model)('Consecutive', consecutiveSchema);
