import { validationResult } from "express-validator";


export function validate(req, res, next) {
    const errors = validationResult(req); 

    if(errors.isEmpty()) {
        return next(); 
    }

    const extractErrors =  [];

    errors.array().map(err => extractErrors.push(err.msg)); 

    res.status(422).json({
        errors: extractErrors
    }); 

}