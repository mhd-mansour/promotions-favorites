import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Promotion } from './promotion.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  userId: string;

  @Column()
  @Index()
  promotionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Promotion, promotion => promotion.favorites)
  @JoinColumn({ name: 'promotionId' })
  promotion: Promotion;
}