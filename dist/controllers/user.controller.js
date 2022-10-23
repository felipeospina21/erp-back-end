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
exports.getUserData = exports.logoutUser = exports.loginUser = exports.createUser = void 0;
const models_1 = require("../models");
const mongoose_1 = require("../services/mongoose");
const utils_1 = require("../utils");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = req.body;
        const newUser = yield (0, mongoose_1.createNewElement)(models_1.User, payload);
        (0, utils_1.controllerResponse)(Promise.resolve({ id: newUser._id }), 201, 400, res);
    });
}
exports.createUser = createUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!password || !email) {
            res.status(400).json({ message: 'password and/or email needed' });
            return;
        }
        const user = yield (0, mongoose_1.findOneByField)(models_1.User, { email });
        if (!user) {
            res.status(400).json({ message: 'user not found' });
            return;
        }
        const token = yield (0, utils_1.generateToken)(password, user === null || user === void 0 ? void 0 : user.password, user._id, email);
        if (!token) {
            res.status(401).json({ message: 'wrong password' });
            return;
        }
        res.cookie('session-token', token, { httpOnly: true, sameSite: 'none', secure: true });
        res.status(200).json({ message: 'success', user: { id: user._id } });
    });
}
exports.loginUser = loginUser;
function logoutUser(req, res) {
    try {
        res.clearCookie('session-token');
        res.status(200).json({ message: 'session canceled' });
    }
    catch (error) {
        res.json({ message: 'not cookie found' });
    }
}
exports.logoutUser = logoutUser;
function getUserData(req, res) {
    const { id } = req.params;
    const user = (0, mongoose_1.findById)(models_1.User, id);
    (0, utils_1.controllerResponse)(user, 200, 400, res);
}
exports.getUserData = getUserData;
