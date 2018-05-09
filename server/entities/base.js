import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export class AbstractBaseEntity {
  @PrimaryColumn('uuid') id;

  @CreateDateColumn({ name: 'created_at' })
  createdAt;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt;
}
