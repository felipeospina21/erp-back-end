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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusOnSale = void 0;
const models_1 = require("../../models");
const services_1 = require("../../services");
function updateStatusOnSale(req, res, next) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { orderedProducts } = req.body;
        try {
            try {
                for (var orderedProducts_1 = __asyncValues(orderedProducts), orderedProducts_1_1; orderedProducts_1_1 = yield orderedProducts_1.next(), !orderedProducts_1_1.done;) {
                    const { item, quantity } = orderedProducts_1_1.value;
                    const { stockAvailable } = yield (0, services_1.findById)(models_1.Product, item, 'stockAvailable -_id -category');
                    if (quantity > stockAvailable) {
                        req.body.status = 'producción';
                        break;
                    }
                    else {
                        req.body.status = 'alistamiento';
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (orderedProducts_1_1 && !orderedProducts_1_1.done && (_a = orderedProducts_1.return)) yield _a.call(orderedProducts_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            next();
        }
        catch (error) {
            res.status(400).json({ message: 'unidentified retailer option' });
        }
    });
}
exports.updateStatusOnSale = updateStatusOnSale;
