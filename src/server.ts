import app from "./app"
import dotenv from "dotenv"

import {AppDataSource} from "./data-source"

dotenv.config()


AppDataSource.initialize()
.then((_) => {
    console.log("Data Source initialized")
    const PORT = process.env.PORT ?? 3000

    app.listen(PORT, () => {
        console.log(`Running on localhost:${PORT}`)
    })
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})
