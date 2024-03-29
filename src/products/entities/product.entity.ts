import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "../entities";
import { User } from "../../auth/entities/user.entity";

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: 'f7a89a59-fd35-4d0e-82ea-81a78ee6da8d',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', { unique: true })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Product price'
    })
    @Column('float', { default: 0 })
    price: number;

    @ApiProperty({
        example: 'Lorem Ipsum',
        description: 'Product description',
        default: null
    })
    @Column({ type: 'text', nullable: true })
    description: string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Product SLUG - for SEO'
    })
    @Column('text', { unique: true })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int', { default: 0 })
    stock: number;

    @ApiProperty({
        example: ['M', 'L', 'XL'],
        description: 'Product sizes'
    })
    @Column('text', { array: true })
    sizes: string[];

    @ApiProperty({
        example: ['men', 'women'],
        description: 'Product gender'
    })
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column('text', { array: true, default: [] })
    tags: string[];

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];


    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: true }
    )
    user: User;


    @BeforeInsert()
    checkSlugInsert() {

        if (!this.slug) {
            this.slug = this.title

        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }
}
