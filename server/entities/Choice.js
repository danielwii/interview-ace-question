import { Column, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import { AbstractBaseEntity } from './base';
import { Question } from './Question';
import { Answer } from './Answer';

@Entity()
export class Choice extends AbstractBaseEntity {
  @Column('varchar') key = undefined;

  @Column('varchar') value = undefined;

  @Column('boolean', { name: 'is_correct' })
  isCorrect = false;

  @ManyToOne(type => Question, question => question.choices)
  @JoinColumn({ name: 'question_id' })
  question = undefined;

  @OneToOne(type => Answer, answer => answer.choice)
  answer = undefined;
}
