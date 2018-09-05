import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Define que la clase es una Entidad de TypeORM
export class Person{
    @PrimaryGeneratedColumn() // Define que la columna es Clave primaria y autoincremental
    id?: number;

    @Column({length: 100}) // Define que la columna tiene un amximo de 100 caracteres
    nombre: string;

    @Column('int') // Define que la columna es un entero
    edad: number;
}