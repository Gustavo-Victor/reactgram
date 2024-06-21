import { body } from "express-validator";


export function userCreateValidation() {
    const nameValidation =
        body("name")
            .isString()
            .withMessage("Name is required")
            .isLength({ min: 3, max: 60 })
            .withMessage("Name must have a minimum of 3 characters and a maximum of 60");

    const emailValidation =
        body("email")
            .isString()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid")
            .isLength({ min: 11, max: 60 })
            .withMessage("Email must have a mininum of 11 characters and a maximum of 60");

    const passwordValidation =
        body("password")
            .isString()
            .withMessage("Password is required")
            .isLength({ min: 5, max: 15 })
            .withMessage("Password must have a mininum of 5 characters and a maxium of 15");

    const passwordConfirmationValidation =
        body("password_confirmation")
            .isString()
            .withMessage("Confirm your password")
            .isLength({ min: 5, max: 15 })
            .withMessage("Password confirmation must have a mininum of 5 characters and a maxium of 15")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("Passwords don't match");
                }
                return true;
            })

    return [
        nameValidation,
        emailValidation,
        passwordValidation,
        passwordConfirmationValidation
    ]
}

export function userLoginValidation() {
    const emailValidation =
        body("email")
            .isString()
            .withMessage("Email is required")

    const passwordValidation =
        body("password")
            .isString()
            .withMessage("Password is required")

    return [
        emailValidation,
        passwordValidation
    ]
}

export function userUpdateValidation() {
    const nameValidation =
        body("name")
            .optional()
            .isLength({ min: 3, max: 60 })
            .withMessage("Name must have a minimum of 3 characters and a maximum of 60")

    const passwordValidation =
        body("password")
            .optional()
            .isLength({ min: 5, max: 15 })
            .withMessage("Password must have a mininum of 5 characters and a maxium of 15");

    return [ nameValidation, passwordValidation ]; 
}