import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import { TAnswer, TChoice, TQuestion } from '../components/Article';

const ANSWER_QUESTION = gql`
  mutation answer($userId: ID!, $questionId: ID!, $choiceId: ID!) {
    answer(userId: $userId, questionId: $questionId, choiceId: $choiceId) {
      id
      isCorrect
      choice {
        id
      }
      question {
        correctChoice {
          id
          key
          value
        }
      }
    }
  }
`;

interface IProp {
  userId: number;
  question: TQuestion;
  answer: TAnswer;
}

interface IState {
  loading: boolean;
}

export default class Question extends React.Component<IProp, IState> {
  input: HTMLInputElement;
  state: IState = {
    loading: false,
  };

  _renderChoices = (choices: TChoice[], answer: TAnswer, choose: (choice: TChoice) => void) => {
    return (
      <div>
        <ul style={{ listStyleType: 'none' }}>
          {(choices || []).map(choice => {
            const hasAnswer = answer && answer.choice.id === choice.id;
            const string = hasAnswer ? 'is-link is-inverted' : '';
            return (
              <li key={choice.id}>
                <a className={'button is-white ' + string} onClick={() => choose(choice)}>
                  {choice.key}:&nbsp;{choice.value}
                </a>
              </li>
            );
          })}
        </ul>
        {answer ? (
          answer.isCorrect ? (
            <div>
              <article className="message is-success">
                <div className="message-body">
                  <strong>RIGHT</strong>
                  {/*<pre>{JSON.stringify(answer, null, 2)}</pre>*/}
                </div>
              </article>
            </div>
          ) : (
            <article className="message is-danger">
              <div className="message-body">
                <strong>WRONG</strong>
                <p>
                  The right answer is: {_.get(answer, 'question.correctChoice.key')}{' '}
                  {_.get(answer, 'question.correctChoice.value')}
                </p>
                {/*<pre>{JSON.stringify(answer, null, 2)}</pre>*/}
              </div>
            </article>
          )
        ) : null}
      </div>
    );
  };

  render() {
    const { question, answer, userId } = this.props;
    return (
      <Mutation mutation={ANSWER_QUESTION}>
        {(answerQuestion, { called, loading, error, data = {} }) => {
          if (called && error) {
            alert(error.message);
          }
          return (
            <div>
              <p>Question {question.id}:</p>
              <p>{question.title}</p>
              {this._renderChoices(question.choices, (data && data.answer) || answer, choice => {
                answerQuestion({
                  variables: { userId, questionId: question.id, choiceId: choice.id },
                });
              })}
              <br />
            </div>
          );
        }}
      </Mutation>
    );
  }
}
