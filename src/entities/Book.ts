import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsInt, Min } from 'class-validator';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsNotEmpty()
    title!: string;

    @Column()
    @IsNotEmpty()
    author!: string;

    @Column()
    @IsNotEmpty()
    publishedDate!: string;

    @Column()
    @IsInt()
    @Min(1)
    numberOfPages!: number;
}
