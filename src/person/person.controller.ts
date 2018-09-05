import { Controller, Get, Param, UseFilters, Post, Body, Query, Put, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpCode } from '@nestjs/common';
import { Person } from './person.entity';
import { PersonService } from './person.service';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';
import { CreatePersonDto } from './dto/create-person.dto';

@Controller('person')
@UseFilters(new HttpExceptionFilter())
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
    async findAll(
    ) {
        return await this.personService.get();
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
