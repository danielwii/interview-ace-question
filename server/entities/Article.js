import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractBaseEntity } from './base';
import { Question } from './Question';

@Entity()
export class Article extends AbstractBaseEntity {
  @Column('text', { nullable: true })
  content;

  @OneToMany(type => Question, question => question.article)
  questions;

  @OneToMany(type => Question, question => question.article)
  answers;
}
