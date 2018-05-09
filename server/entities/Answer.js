import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractBaseEntity } from './base';
import { Article } from './Article';
import { Question } from './Question';
import { User } from './User';
import { OneToOne } from 'typeorm/index';
import { Choice } from './Choice';

@Entity()
export class Answer extends AbstractBaseEntity {
  @OneToOne(type => Choice)
  @JoinColumn({ name: 'choice_id' })
  choice = undefined;

  @Column('boolean', { name: 'is_right' })
  isRight = undefined;

  @ManyToOne(type => Article, article => article.quesions)
  @JoinColumn({ name: 'article_id' })
  article = undefined;

  @ManyToOne(type => Question, question => question.choices)
  @JoinColumn({ name: 'question_id' })
  question = undefined;

  @ManyToOne(type => User, user => user.choices)
  @JoinColumn({ name: 'user_id' })
  user = undefined;
}
