"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRetailer = void 0;
function transformRetailer(req, res, next) {
    const { retailer } = req.body;
    try {
        if (retailer === 'si')
            req.body.retailer = true;
        if (retailer === 'no')
            req.body.retailer = false;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'unidentified retailer option' });
    }
}
exports.transformRetailer = transformRetailer;
