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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = exports.deletetById = exports.findOneByField = exports.findById = exports.findAll = exports.createNewElement = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
function createNewElement(Schema, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newElement = yield Schema.create(payload);
            return newElement;
        }
        catch (error) {
            logger_1.default.error(error);
            throw error;
        }
    });
}
exports.createNewElement = createNewElement;
function findAll(Schema, sortBy) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const elementsList = yield Schema.find().sort(sortBy);
            return elementsList;
        }
        catch (error) {
            logger_1.default.error(error);
            throw error;
        }
    });
}
exports.findAll = findAll;
function findById(Schema, id, field) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const element = yield Schema.findById(id).select(field);
            return element;
        }
        catch (error) {
            logger_1.default.error(error);
            throw error;
        }
    });
}
exports.findById = findById;
function findOneByField(Schema, field) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const element = yield Schema.findOne(field);
            return element;
        }
        catch (error) {
            logger_1.default.error(error);
            throw error;
        }
    });
}
exports.findOneByField = findOneByField;
function deletetById(Schema, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedElement = yield Schema.findByIdAndDelete(id);
            if (!deletedElement) {
                throw new Error('Element not found');
            }
            return deletedElement;
        }
        catch (error) {
            throw String(error);
        }
    });
}
exports.deletetById = deletetById;
function updateById(Schema, id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedElement = yield Schema.findByIdAndUpdate(id, update);
            if (!updatedElement) {
                throw new Error('Element not found');
            }
            return updatedElement;
        }
        catch (error) {
            throw String(error);
        }
    });
}
exports.updateById = updateById;
