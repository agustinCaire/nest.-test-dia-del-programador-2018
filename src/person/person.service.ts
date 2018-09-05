import { Injectable, NotFoundException } from '@nestjs/common';
import { Person } from './person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';

@Injectable()
export class PersonService {

    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ){}

    async create(person: Person){
        return await this.personRepository.save(person);
    }

    async get(age?: number): Promise<Person[]>{
        if(age)
            return await this.personRepository.find({
                age: LessThan(age+1),
            });
        else
            return await this.personRepository.find();
    }

    async getById(id: number): Promise<Person>{
        const p = await this.personRepository.findOne(id);
        if(p)
            return p;
        
        throw new NotFoundException();
    }

    async update(id: number, person: Person): Promise<Person>{
        let stored = await this.personRepository.findOne(id);
        if (stored){
          stored = {...stored, ...person};
          return await this.personRepository.save(stored);
        }
        else{
          throw new NotFoundException();
        }
    }

    async delete(id: number): Promise<void>{
        const stored = await this.personRepository.findOne(id);
        if (stored){
          await this.personRepository.delete(stored);
        }
        else{
          throw new NotFoundException();
        }
    }
}
