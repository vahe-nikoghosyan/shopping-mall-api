import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    sku!: string;

    @Column("decimal")
    price!: number;

    @ManyToOne(() => Category, (category) => category.products)
    category!: Category;
}