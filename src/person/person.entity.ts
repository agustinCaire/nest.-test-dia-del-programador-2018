import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({length: 100})
    name: string;

    @Column('int')
    age: number;
}