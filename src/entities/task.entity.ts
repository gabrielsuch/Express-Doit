import {PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, ManyToOne} from "typeorm"

import {User} from "./user.entity"


@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 100,
        nullable: false
    })
    title: string

    @Column({
        length: 255,
        nullable: false
    })
    description: string

    @CreateDateColumn({
        nullable: false
    })
    date: Date

    @Column({
        type: "int",
        nullable: false,
        default: 0
    })
    progress: number

    @ManyToOne((type) => User, (user) => user.tasks, {
        eager: true
    })
    user: User

}