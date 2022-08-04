import {Express} from "express"

import userRoute from "./user.routes"
import taskRoute from "./task.routes"


const registerRoutes = (app: Express) => {
    app.use("/user", userRoute())
    app.use("/task", taskRoute())
}


export default registerRoutes