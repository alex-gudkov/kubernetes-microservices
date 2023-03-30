import { Session } from 'inspector';

import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletsEntity } from './entities/wallets.entity';
import { SessionsEntity } from './interfaces/sessions-entity';

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(WalletsEntity) private readonly walletsRepository: Repository<WalletsEntity>,
        @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    ) {}

    public findWallets(): Promise<WalletsEntity[]> {
        return this.walletsRepository.find({});
    }

    public async putMoneyOnWallet(walletId: number, moneyAmount: number): Promise<WalletsEntity> {
        const wallet = await this.walletsRepository.findOneBy({
            id: walletId,
        });

        if (!wallet) {
            throw new NotFoundException('Wallet not found.');
        }

        wallet.balance = Number(wallet.balance) + Number(moneyAmount);

        return this.walletsRepository.save(wallet);
    }

    public createWallet(createWalletDto: CreateWalletDto, userId: number): Promise<WalletsEntity> {
        const wallet = this.walletsRepository.create({
            name: createWalletDto.name,
            balance: 0,
            userId,
        });

        return this.walletsRepository.save(wallet);
    }

    public async findCurrentSessionOrThrow(request: Request): Promise<SessionsEntity> {
        const sessionId = request.cookies['SESSION_ID'];

        if (!sessionId) {
            throw new UnauthorizedException('No SESSION_ID in cookies.');
        }

        const pattern = 'FIND_SESSION_BY_ID';
        const payload = {
            sessionId,
        };
        const session = await firstValueFrom(
            this.authServiceClient.send<Promise<SessionsEntity | null>>(pattern, payload),
        );

        if (!session) {
            throw new UnauthorizedException('User not unauthorized.');
        }

        return session;
    }
}
