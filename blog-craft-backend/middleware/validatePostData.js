const { body, validationResult } = require("express-validator");

// Validation rules
const validatePostData = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 5 })
        .withMessage('Title must be at least 5 characters long'),
    body('content')
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 20 })
        .withMessage('Content must be at least 20 characters long'),
];

// Middleware for checking validation result
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validatePostData, checkValidation };
