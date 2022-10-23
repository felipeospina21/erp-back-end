"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consecutiveRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.consecutiveRouter = (0, express_1.Router)();
exports.consecutiveRouter.get('/:id', controllers_1.getConsecutiveById);
exports.consecutiveRouter.put('/', controllers_1.updateConsecutive);
