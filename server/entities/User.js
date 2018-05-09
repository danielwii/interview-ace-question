import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractBaseEntity } from './base';
import { Answer } from './Answer';

@Entity()
export class User extends AbstractBaseEntity {
  @Column('varchar') username = undefined;

  @OneToMany(type => Answer, answer => answer.user, {
    onDelete: 'CASCADE',
  })
  answers = undefined;
}
