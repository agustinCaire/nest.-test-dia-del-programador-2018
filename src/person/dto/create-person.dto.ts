import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty, ApiMod } from '@nestjs/swagger';

export class CreatePersonDto {

    @IsString() 
    
    @ApiModelProperty({example: "Agustin"})
    readonly name: string;


    @IsInt() 

    @ApiModelProperty({example: 22})
    readonly age: number;

}
