import { Controller, Get, Param, UseFilters, Post, Body, Query, Put, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpCode, Optional } from '@nestjs/common';
import { Person } from './person.entity';
import { PersonService } from './person.service';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';
import { CreatePersonDto } from './dto/create-person.dto';
import { ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';

@Controller('person')
@UseFilters(new HttpExceptionFilter())

@ApiUseTags('person')
export class PersonController {

    constructor(
        private readonly personService: PersonService,
    ){
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createPersonDto: CreatePersonDto) {
        return await this.personService.create(createPersonDto);
    }

    @Get()
    @ApiImplicitQuery({
        name: 'age',
        required:false,
        type: 'number',
        description:'Filtra por edad <= al valor dado'
    })
    async findAll(
        @Query() query,
    ) {
        let age;
        if(query.hasOwnProperty('age'))
            age = parseInt(query.age);
        return await this.personService.get(age);
    }

    @Get(':id')
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
    @HttpCode(204)
    async remove(
        @Param('id',ParseIntPipe) id: number, 
    ) {
        return await this.personService.delete(id);
    }

}
