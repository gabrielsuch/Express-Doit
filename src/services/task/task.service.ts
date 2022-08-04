import {Request} from "express"

import {AppDataSource} from "../../data-source"
import {Task} from "../../entities/task.entity"
import {User} from "../../entities/user.entity"


class TaskService {
    getTask = async (req: Request) => {
        const taskRepository = AppDataSource.getRepository(Task)
        const task = await taskRepository.findOneBy({
            id: req.params.id
        })

        const {user, ...removedUser} = task

        return {status: 200, message: removedUser}
    }

    getTasks = async (req: Request) => {
        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.findOneBy({
            email: req.decoded
        })

        const tasks = await AppDataSource.getRepository(User)
                                        .createQueryBuilder("user")
                                        .leftJoinAndSelect("user.tasks", "tasks")
                                        .where("user.id = :id", {
                                            id: user.id
                                        })
                                        .getOne()
 
        return {status: 200, message: tasks}
    }

    createTask = async ({validated}: Request) => {
        const taskRepository = AppDataSource.getRepository(Task)
        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.findOneBy({
            email: validated["decoded"]
        })

        const task = new Task()
        task.title = validated["title"]
        task.description = validated["description"]
        task.user = user

        taskRepository.create(task)
        await taskRepository.save(task)

        return {status: 201, message: task}
    }

    deleteTask = async (req: Request) => {
        const taskRepository = AppDataSource.getRepository(Task)
        const taskFound = await taskRepository.findOneBy({
            id: req.params.id
        })

        await taskRepository.delete(taskFound.id)

        return {status: 204, message: ""}
    }
}


export default new TaskService()