import { Column, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import { AbstractBaseEntity } from './base';
import { Question } from './Question';
import { Answer } from './Answer';
import { OneToMany } from 'typeorm/index';

@Entity()
export class Choice extends AbstractBaseEntity {
  @Column('varchar') key = undefined;

  @Column('varchar') value = undefined;

  @Column('boolean', { name: 'is_correct' })
  isCorrect = false;

  @OneToMany(type => Answer, answer => answer.choices, { onDelete: 'CASCADE' })
  answers = undefined;

  @ManyToOne(type => Question, question => question.choices)
  @JoinColumn({ name: 'question_id' })
  question = undefined;
}
