import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum AuditAction {
  FAVORITED = 'favorited',
  UNFAVORITED = 'unfavorited'
}

@Entity()
export class AuditEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  promotionId: string;

  @Column({
    type: 'varchar',
    enum: AuditAction
  })
  action: AuditAction;

  @CreateDateColumn()
  timestamp: Date;
}