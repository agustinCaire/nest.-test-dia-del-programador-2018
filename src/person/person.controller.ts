import { Controller, Get, Param, UseFilters, Post, Body, Query, Put, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpCode, Optional } from '@nestjs/common';
import { Person } from './person.entity';
import { PersonService } from './person.service';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';
import { CreatePersonDto } from './dto/create-person.dto';
import { ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';

@Controller('personas') // Define que esta clase es un controlador para la ruta /personas
@UseFilters(new HttpExceptionFilter()) // Usar el filtro a nivel de controlador

@ApiUseTags('personas') // Indica a swagger el nombre del controlador
export class PersonController {

    constructor(
        private readonly personService: PersonService, // Inyecta el servicio de personas
    ){
    }

    @Post()
    @UsePipes(new ValidationPipe()) // Utilizar Pipe para validar cuerpo de la peticion
    async create( // sintaxis ASYNC - AWAIT
        @Body() createPersonDto: CreatePersonDto // Obtiene el cuerpo de la peticion
    ) {
        return await this.personService.create(createPersonDto);
    }

    @Get()
    @ApiImplicitQuery({
        name: 'edad',
        required:false,
        type: 'number',
        description:'Filtra por edad <= al valor dado'
    }) // Incluye el parametro de manera forzada a la descripcion de Swagger
    async findAll(
        @Query() query,
    ) {
        let age;
        if(query.hasOwnProperty('edad'))
            age = parseInt(query.edad);
        
        return await this.personService.get(age);
    }

    @Get(':id') // Parametro id
    async findOne(
        @Param('id',ParseIntPipe) id: number, 
    ) {
        return await this.personService.getById(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id',ParseIntPipe) id: number, 
        @Body() updatePersonDto: CreatePersonDto
    ) {
        return await this.personService.update(id, updatePersonDto);
    }

    @Delete(':id')
    @HttpCode(204) // Indica que este metodo debe devolver el status especificado en lugar del por defecto
    async remove(
        @Param('id',ParseIntPipe) id: number, 
    ) {
        return await this.personService.delete(id);
    }

}
