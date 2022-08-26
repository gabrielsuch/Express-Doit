import {Request} from "express"

import {AppDataSource} from "../../data-source"
import {Task} from "../../entities/task.entity"
import {User} from "../../entities/user.entity"


class TaskService {
    getTask = async ({params}: Request) => {
        const taskRepository = AppDataSource.getRepository(Task)
        const task = await taskRepository.findOneBy({
            id: params.id
        })

        const {user, ...removedUser} = task

        return {status: 200, message: removedUser}
    }

    getTasks = async ({decoded}: Request) => {
        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.findOneBy({
            email: decoded
        })

        const tasks = await AppDataSource.getRepository(User)
                                        .createQueryBuilder("user")
                                        .leftJoinAndSelect("user.tasks", "tasks")
                                        .where("user.id = :id", {
                                            id: user.id
                                        })
                                        .orderBy("date", "DESC")
                                        .getOne()
 
        return {status: 200, message: tasks.tasks}
    }

    createTask = async ({decoded, validated}: Request) => {
        const taskRepository = AppDataSource.getRepository(Task)
        const userRepository = AppDataSource.getRepository(User)

        const userFound = await userRepository.findOneBy({
            email: decoded
        })

        const task = new Task()
        task.title = validated["title"]
        task.description = validated["description"]
        task.user = userFound

        taskRepository.create(task)
        await taskRepository.save(task)

        const {user, ...removedUser} = task

        return {status: 201, message: removedUser}
    }

    deleteTask = async ({params}: Request) => {
        const taskRepository = AppDataSource.getRepository(Task)
        const taskFound = await taskRepository.findOneBy({
            id: params.id
        })

        await taskRepository.delete(taskFound.id)

        return {status: 204, message: ""}
    }

    updateProgress = async ({params}: Request) => {
        const taskRepository = AppDataSource.getRepository(Task)
        const taskFound = await taskRepository.findOneBy({
            id: params.id
        })

        if(taskFound.progress >= 100) {
            return {status: 400, message: {error: "Limit for Progress is 100."}}
        }

        const update = {
            progress: taskFound.progress + 5
        }

        await taskRepository.update(taskFound.id, update)
        
        const updatedTask = await taskRepository.findOneBy({
            id: params.id
        })

        const {user, ...removedUser} = updatedTask
        
        return {status: 200, message: removedUser}
    }
}


export default new TaskService()