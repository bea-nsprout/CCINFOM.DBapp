import { validationResult, matchedData } from "express-validator";


export const extractMatchedRoutine = (req, res, next) => {
    res.locals.data = matchedData(req)
    next()
}

export const validationStrictRoutine = (status, description) => {
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


export const assertDefined = (field) => {
    const routine = (req, res, next) => {
        if (matchedData(req)[field] == undefined) {
            next('route');
            return;
        }
        next();
    }

    return routine;
}
// export const validationPassRoutine = (queries) => {
//     const routine = (req, res, next) => {
//         const errors = validationResult(req);
//         if(!errors.isEmpty()) {
//             next('route')
//         }
//     }
// }