import app from "./app"

import {AppDataSource} from "./data-source"


const PORT = 3000

AppDataSource.initialize()
.then((_) => {
    console.log("Data Source initialized")

    app.listen(PORT, () => {
        console.log(`Running on localhost:${PORT}`)
    })
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})
