import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class AbstractBaseEntity {
  @PrimaryGeneratedColumn() id = undefined;

  @CreateDateColumn({ name: 'created_at' })
  createdAt = undefined;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt = undefined;
}
