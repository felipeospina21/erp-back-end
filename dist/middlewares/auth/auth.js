"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function isAuthenticated(req, res, next) {
    var _a, _b;
    if (req.headers.cookie) {
        try {
            const [tokenType, tokenValue] = (_b = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('=')) !== null && _b !== void 0 ? _b : [];
            const verifiedToken = jsonwebtoken_1.default.verify(tokenValue, process.env.SECRET_TOKEN_KEY);
            if (tokenType === 'session-token' && verifiedToken) {
                next();
            }
        }
        catch (error) {
            res.status(401).json({ error: 'unauthorized user' });
        }
    }
    else {
        res.status(401).json({ error: 'unauthorized user' });
    }
}
exports.isAuthenticated = isAuthenticated;
