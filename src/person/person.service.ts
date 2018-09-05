import { Injectable, NotFoundException } from '@nestjs/common';
import { Person } from './person.entity';

@Injectable()
export class PersonService {

  

    async get(): Promise<Person[]>{
    }

    async getById(id: number): Promise<Person>{
        const p: Person = this.data.find((p: Person) => p.id === id);
        if (p)
            throw new NotFoundException();

        return p;

    }
}
