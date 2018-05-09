import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractBaseEntity } from './base';
import { Article } from './Article';
import { Question } from './Question';
import { User } from './User';

@Entity()
export class Answer extends AbstractBaseEntity {
  @Column('varchar') choice;

  @Column('boolean', { name: 'is_right' })
  isRight;

  @ManyToOne(type => Article, article => article.quesions)
  @JoinColumn({ name: 'article_id' })
  article;

  @ManyToOne(type => Question, question => question.choices)
  @JoinColumn({ name: 'question_id' })
  question;

  @ManyToOne(type => User, user => user.choices)
  @JoinColumn({ name: 'user_id' })
  user;
}
