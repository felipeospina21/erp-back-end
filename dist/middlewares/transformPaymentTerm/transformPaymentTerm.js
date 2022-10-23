"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPaymentTerm = void 0;
function transformPaymentTerm(req, res, next) {
    const { paymentTerm } = req.body;
    try {
        if (paymentTerm.toLowerCase() === 'contado') {
            req.body.paymentTerm = 0;
        }
        else {
            req.body.paymentTerm = parseInt(paymentTerm);
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'unidentified payment term' });
    }
}
exports.transformPaymentTerm = transformPaymentTerm;
