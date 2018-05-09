import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractBaseEntity } from './base';
import { Question } from './Question';

@Entity()
export class Choice extends AbstractBaseEntity {
  @Column('varchar') key;

  @ManyToOne(type => Question, question => question.choices)
  @JoinColumn({ name: 'question_id' })
  question;
}
