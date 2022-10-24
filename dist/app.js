"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
exports.app = (0, express_1.default)();
// middlewares
exports.app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://erp-dlt.vercel.app',
        'https://erp-dlt-dev.vercel.app',
        'https://erp-felipeospina21.vercel.app',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Access-Control-Allow-Headers', 'Set-Cookie', 'Content-Type'],
    credentials: true,
}));
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
// security
exports.app.use((0, xss_clean_1.default)());
// routes
exports.app.use('/', routes_1.homeRouter);
exports.app.use('/api/products', middlewares_1.isAuthenticated, routes_1.productRouter);
exports.app.use('/api/clients', middlewares_1.isAuthenticated, routes_1.clientRouter);
exports.app.use('/api/sales', middlewares_1.isAuthenticated, routes_1.saleRouter);
exports.app.use('/api/invoice', middlewares_1.isAuthenticated, routes_1.invoiceRouter);
exports.app.use('/api/consecutive', middlewares_1.isAuthenticated, routes_1.consecutiveRouter);
exports.app.use('/api/category', middlewares_1.isAuthenticated, routes_1.categoryRouter);
exports.app.use('/api/tax', middlewares_1.isAuthenticated, routes_1.withholdingTaxRouter);
exports.app.use('/api/user', routes_1.userRouter);
