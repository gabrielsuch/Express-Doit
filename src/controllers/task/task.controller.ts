import {Request, Response} from "express"

import TaskService from "../../services/task/task.service"


class TaskController {  
    getTask = async (req: Request, res: Response) => {
        const task = await TaskService.getTask(req)

        return res.status(task.status).json(task.message)
    }

    getTasks = async (req: Request, res: Response) => {
        const tasks = await TaskService.getTasks(req)

        return res.status(tasks.status).json(tasks.message)
    }

    createTask = async (req: Request, res: Response) => {
        const task = await TaskService.createTask(req)

        return res.status(task.status).json(task.message)
    }

    deleteTask = async (req: Request, res: Response) => {
        const task = await TaskService.deleteTask(req)

        return res.status(task.status).json(task.message)
    }
}


export default new TaskController()