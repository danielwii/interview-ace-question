import { Column, Entity, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';

import { AbstractBaseEntity } from './base';
import { Article } from './Article';
import { Choice } from './Choice';
import { Answer } from './Answer';

@Entity()
export class Question extends AbstractBaseEntity {
  @Column('int') original = undefined;

  @Column('text') title = undefined;

  @OneToOne(type => Choice)
  @JoinColumn({ name: 'correct_choice_id' })
  correctChoice = undefined;

  @OneToMany(type => Choice, choice => choice.question, { cascade: true, onDelete: 'CASCADE' })
  choices = undefined;

  @OneToMany(type => Answer, answer => answer.question, { onDelete: 'CASCADE' })
  answers = undefined;

  @ManyToOne(type => Article, article => article.quesions)
  @JoinColumn({ name: 'article_id' })
  article = undefined;
}
