import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractBaseEntity } from './base';
import { Answer } from './Answer';

@Entity()
export class User extends AbstractBaseEntity {
  @Column('varchar') username;

  @OneToMany(type => Answer, answer => answer.user)
  answers;
}
