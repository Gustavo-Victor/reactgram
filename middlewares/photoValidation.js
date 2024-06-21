import { body } from "express-validator";


export function photoCreateValidation() {
    const titleValidation =
        body("title")
            .not()
            .equals("undefined")
            .withMessage("Title is required")
            .isString()
            .withMessage("Title is required")
            .isLength({ min: 6, max: 40 })
            .withMessage("Title should have a minimum of 6 characters and a maximum of 40")

    const srcValidation =
        body("src")
            .custom((value, { req }) => {
                if (!req.file) {
                    throw new Error("Image is required")
                }
                return true;
            })

    return [titleValidation, srcValidation];
}

export function photoUpdateValidation() {
    const titleValidation =
        body("title")
            .optional()
            .isLength({ min: 6, max: 40 })
            .withMessage("Title shoud have a minimum of 6 characters and a maximum of 40")

    return [titleValidation];
}

export function createCommentValidation() {
    const commentTextValidation =
        body("text")
            .isString()
            .withMessage("Comment message is required")
            .isLength({ max: 150 })
            .withMessage("Comment must have a maximum of 150 characters");
    return [commentTextValidation]; 
}