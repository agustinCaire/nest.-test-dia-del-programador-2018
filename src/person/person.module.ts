import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';

@Module({
  controllers: [PersonController],
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonService],
})
export class PersonModule {}
