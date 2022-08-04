import {PrimaryGeneratedColumn, Column, Entity, OneToMany} from "typeorm"

import {Task} from "./task.entity"


@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 50,
        nullable: false
    })
    name: string

    @Column({
        length: 100,
        nullable: false,
        unique: true
    })
    email: string

    @Column({
        length: 255,
        nullable: false
    })
    password: string

    @OneToMany((type) => Task, (task) => task.user)
    tasks: Task[]
}