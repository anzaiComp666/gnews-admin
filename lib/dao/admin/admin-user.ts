import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";


@Entity({ name: 'admin_user' })
export class AdminUserEntity extends BaseEntity {
    @Column()
    username!: string;

    @Column()
    password!: string;
}