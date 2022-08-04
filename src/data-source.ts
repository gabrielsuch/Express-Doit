import {DataSource} from "typeorm"

import dotenv from "dotenv"
import path from "path"

dotenv.config()


export const AppDataSource = new DataSource ({
    type: "postgres",
    host: "localhost",
    url: process.env.DATABASE_URL,
    entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
    migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")]
})