import {Router} from "express"

import UserController from "../controllers/user/user.controller"

import validateSchemaMiddleware from "../middlewares/validateSchema.middleware"
import verifyEmailExists from "../middlewares/verifyEmailExists.middleware"

import createUserSchema from "../schema/user/createUser.schema"
import loginSchema from "../schema/user/login.schema"


const route = Router()


const userRoute = () => {
    route.post("/register", validateSchemaMiddleware(createUserSchema), verifyEmailExists, UserController.createUser)
    route.post("/login", validateSchemaMiddleware(loginSchema), UserController.login)

    return route
}


export default userRoute