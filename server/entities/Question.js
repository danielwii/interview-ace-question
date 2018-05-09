import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { AbstractBaseEntity } from './base';
import { Article } from './Article';
import { Choice } from './Choice';

@Entity()
export class Question extends AbstractBaseEntity {
  @Column('text') title;

  @Column('varchar', { name: 'correct_answer' })
  correctAnswer;

  @ManyToOne(type => Article, article => article.quesions)
  @JoinColumn({ name: 'article_id' })
  article;

  @OneToMany(type => Choice, choice => choice.question)
  choices;
}
