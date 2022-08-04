import {Request, Response, NextFunction} from "express"

import {AppDataSource} from "../data-source"
import {User} from "../entities/user.entity"


const verifyEmailExists = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({
        email: req.validated["email"]
    })

    if(user) {
        return res.status(409).json({error: "Email already exists."})
    }

    return next()
}


export default verifyEmailExists