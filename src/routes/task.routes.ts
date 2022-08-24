import {Router} from "express"

import TaskController from "../controllers/task/task.controller"

import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"
import validateUUIDMiddleware from "../middlewares/validateUUID.middleware"
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware"
import verifyOwnerTaskMiddleware from "../middlewares/verifyOwnerTask.middleware"

import createTaskSchema from "../schema/task/createTask.schema"


const route = Router()


const taskRoute = () => {
    route.get("/:id", verifyTokenMiddleware, validateUUIDMiddleware, verifyOwnerTaskMiddleware, TaskController.getTask)
    route.get("", verifyTokenMiddleware, TaskController.getTasks)
    route.post("", verifyTokenMiddleware, validateSchemaMiddleware(createTaskSchema), TaskController.createTask)   
    route.delete("/:id", verifyTokenMiddleware, validateUUIDMiddleware, verifyOwnerTaskMiddleware, TaskController.deleteTask) 
    route.patch("/progress/:id", verifyTokenMiddleware, validateUUIDMiddleware, verifyOwnerTaskMiddleware, TaskController.updateProgress)

    return route
}


export default taskRoute