"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        try {
            if (schema.body)
                schema.body.parse(req.body);
            if (schema.query)
                schema.query.parse(req.query);
            if (schema.params)
                schema.params.parse(req.params);
            next();
        }
        catch (err) {
            return res.status(400).json({ message: 'Validation error', errors: err.errors ?? err });
        }
    };
};
exports.validate = validate;
