import {Request, Response, NextFunction} from "express"

import {AppDataSource} from "../data-source"
import {User} from "../entities/user.entity"
import {Task} from "../entities/task.entity"


const verifyOwnerTaskMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        email: req.decoded
    })

    const task = await AppDataSource.getRepository(Task)
                                    .createQueryBuilder("task")
                                    .leftJoinAndSelect("task.user", "tasks")
                                    .where("task.user = :id", {
                                        id: user.id
                                    })
                                    .where("task.id = :id", {
                                        id: req.params.id
                                    })
                                    .getOne()

    if(!task) {
        return res.status(404).json({error: "Task not found."})
    }

    if(!(task.user.id === user.id)) {
        return res.status(422).json({error: "This Task doesn't belong for this user."})
    }

    return next()
}


export default verifyOwnerTaskMiddleware