import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePersonDto {

    @IsString() // Valida que sea un string
    
    @ApiModelProperty({example: "Agustin"})  // Para swagger
    readonly nombre: string;


    @IsInt() // Valida que sea un numero entero

    @ApiModelProperty({example: 22}) // Para swagger
    readonly edad: number;

}
