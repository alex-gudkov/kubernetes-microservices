import { Controller, Get } from '@nestjs/common';

import { WalletService } from './wallet.service';

@Controller('/wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @Get('/hello')
    public getHello(): string {
        return this.walletService.getHello();
    }
}
