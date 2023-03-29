import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, unique: true })
    login: string;

    @Column({ nullable: false })
    password: string;
}
