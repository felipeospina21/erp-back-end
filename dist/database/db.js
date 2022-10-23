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
exports.cleanup = exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        // if (connection) return;
        try {
            yield (0, mongoose_1.connect)(process.env.MONGODB_URI || "mongodb://localhost:27017/DLT");
            console.log('succesfully connected to DB');
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.connectDB = connectDB;
function disconnectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongoose_1.connection)
            return;
        yield (0, mongoose_1.disconnect)();
    });
}
exports.disconnectDB = disconnectDB;
function cleanup() {
    return __awaiter(this, void 0, void 0, function* () {
        if (mongoose_1.connection) {
            const promises = [];
            for (const collection in mongoose_1.connection.collections) {
                promises.push(mongoose_1.connection.collections[collection].deleteMany({}));
            }
            return yield Promise.all(promises);
        }
    });
}
exports.cleanup = cleanup;
