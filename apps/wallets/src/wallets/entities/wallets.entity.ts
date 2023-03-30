import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'wallets' })
export class WalletsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, default: 0 })
    balance: number;

    @Column({ nullable: false })
    userId: number;
}
