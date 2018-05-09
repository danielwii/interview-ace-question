import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractBaseEntity } from './base';
import { Question } from './Question';
import { Answer } from './Answer';

@Entity()
export class Article extends AbstractBaseEntity {
  @Column('text', { nullable: true })
  content = undefined;

  @OneToMany(type => Question, question => question.article, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  questions = undefined;

  @OneToMany(type => Answer, answer => answer.article, {
    onDelete: 'CASCADE',
  })
  answers = undefined;
}
