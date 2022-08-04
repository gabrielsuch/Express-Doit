import {Express} from "express"

import {User} from "../../entities/user.entity"
import {Task} from "../../entities/task.entity"


declare global {
    namespace Express {
        interface Request {
            decoded: string
            validated: User | Task
        }
    }
}