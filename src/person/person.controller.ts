import { Controller, Get, Param, UseFilters, Post, Body, Query, Put, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
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
        return 'This action adds a new cat';
    }

    @Get()
    async findAll(
    ) {
        return `This action returns all cats (limit: ${query.limit} items)`;
    }

    @Get(':id')
    async findOne(
        @Param('id',ParseIntPipe) id: number, 
    ) {
        return `This action returns a #${id} cat`;
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id',ParseIntPipe) id: number, 
        @Body() updatePersonDto: CreatePersonDto
    ) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    async remove(
        @Param('id',ParseIntPipe) id: number, 
    ) {
        return `This action removes a #${id} cat`;
    }
