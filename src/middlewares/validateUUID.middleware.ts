import {Request, Response, NextFunction} from "express"
import {version, validate} from "uuid"


const validateUUIDMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(!(validate(req.params.id) && version(req.params.id) === 4)) {
        return res.status(400).json({error: "Invalid UUID type."})
    }

    return next()
}


export default validateUUIDMiddleware