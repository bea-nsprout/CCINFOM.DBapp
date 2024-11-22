import { validationResult, matchedData } from "express-validator";


export const extractMatchedRoutine = (req, res, next) => {
    res.locals.data = matchedData(req)
    next()
}

export const validationRoutine = (status, description) => {
    const routine = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res
                .status(status)
                .json({
                    errors: errors.array(),
                    description: description
                });
            return;
        }
        next()
    }

    return routine

}