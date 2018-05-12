import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractBaseEntity } from './base';
import { Article } from './Article';
import { Question } from './Question';
import { User } from './User';
import { OneToOne } from 'typeorm/index';
import { Choice } from './Choice';

@Entity()
export class Answer extends AbstractBaseEntity {
  @Column('boolean', { name: 'is_correct' })
  isCorrect = undefined;

  @OneToOne(type => Choice)
  @JoinColumn({ name: 'choice_id' })
  choice = undefined;

  @ManyToOne(type => Article, article => article.answers)
  @JoinColumn({ name: 'article_id' })
  article = undefined;

  @ManyToOne(type => Question, question => question.answers)
  @JoinColumn({ name: 'question_id' })
  question = undefined;

  @ManyToOne(type => User, user => user.answers)
  @JoinColumn({ name: 'user_id' })
  user = undefined;
}
