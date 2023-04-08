import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppHttpController {
    @Get('/')
    public getMessage(): { message: string } {
        return {
            message: 'Auth microservice!',
        };
    }
}
