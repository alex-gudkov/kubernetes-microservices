import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletDto {
    @IsNotEmpty()
    @IsString()
    public readonly name: string;
}
