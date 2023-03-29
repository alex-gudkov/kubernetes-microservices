import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletService {
    public getHello(): string {
        return 'Hello wallet microservice!';
    }
}
