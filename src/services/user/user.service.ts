import {Request} from "express"

import {AppDataSource} from "../../data-source"
import {User} from "../../entities/user.entity"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import dotenv from "dotenv"

dotenv.config()


class UserService {
    createUser = async ({validated}: Request) => {
        const userRepository = AppDataSource.getRepository(User)

        const user = new User()
        user.name = validated["name"]
        user.email = validated["email"]
        user.password = await bcrypt.hash(validated["password"], 10)

        userRepository.create(user)
        await userRepository.save(user)

        return {status: 201, message: user}
    }

    login = async ({validated}: Request) => {
        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.findOneBy({
            email: validated["email"]
        })

        if(!user) {
            return {status: 404, message: {error: "Email not found."}}
        }

        const comparePassword = await bcrypt.compare(validated["password"], user.password)

        if(!comparePassword) {
            return {status: 400, message: {error: "Password doesn't matches."}}
        }

        const token = jwt.sign({email: user.email}, String(process.env.SECRET_KEY), {expiresIn: "3h"})

        return {status: 200, message: {accessToken: token}}
    }
}


export default new UserService()