import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, Index } from 'typeorm';
import { Favorite } from './favorite.entity';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  titleAr: string;

  @Column()
  @Index()
  merchant: string;

  @Column({ nullable: true })
  merchantAr: string;

  @Column('decimal', { precision: 10, scale: 2 })
  rewardAmount: number;

  @Column({ default: 'USD' })
  rewardCurrency: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  descriptionAr: string;

  @Column('text')
  terms: string;

  @Column('text', { nullable: true })
  termsAr: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  @Index()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Favorite, favorite => favorite.promotion)
  favorites: Favorite[];
}