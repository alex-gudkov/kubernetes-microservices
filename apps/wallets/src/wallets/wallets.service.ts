import { log } from 'console';

import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletsEntity } from './entities/wallets.entity';
import { UsersEntity } from './interfaces/users-entity.interface';

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(WalletsEntity) private readonly walletsRepository: Repository<WalletsEntity>,
        @Inject('USERS_SERVICE') private readonly usersServiceClientProxy: ClientProxy,
    ) {}

    public findWallets(): Promise<WalletsEntity[]> {
        return this.walletsRepository.find({});
    }

    public async putMoneyOnWallet(walletId: number, moneyAmount: string): Promise<WalletsEntity> {
        if (!parseInt(moneyAmount, 10)) {
            throw new BadRequestException('Money amount not specified.');
        }

        const wallet = await this.walletsRepository.findOneBy({
            id: walletId,
        });

        if (!wallet) {
            throw new NotFoundException('Wallet not found.');
        }

        wallet.balance = Number(wallet.balance) + Number(moneyAmount);

        return this.walletsRepository.save(wallet);
    }

    public async createWallet(createWalletDto: CreateWalletDto, userId: number): Promise<WalletsEntity> {
        if (!createWalletDto.name) {
            throw new BadRequestException('Wallet name not specified.');
        }

        const pattern = 'FIND_USER_BY_ID';
        const payload = {
            userId,
        };
        const user = await firstValueFrom(this.usersServiceClientProxy.send<Promise<UsersEntity>>(pattern, payload));

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const wallet = this.walletsRepository.create({
            name: createWalletDto.name,
            balance: 0,
            userId,
        });

        return this.walletsRepository.save(wallet);
    }
}
