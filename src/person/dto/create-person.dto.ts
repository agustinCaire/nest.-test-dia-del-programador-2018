import { IsString, IsInt } from 'class-validator';

export class CreatePersonDto {

    @IsString() 
    readonly name: string;

    @IsInt() 
    readonly age: number;

}
